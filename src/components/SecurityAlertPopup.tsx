import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { AnimatePresence, motion } from 'motion/react';
import { AlertTriangle, X, ExternalLink, Shield } from 'lucide-react';

interface AlertInsight {
  id: string;
  title: string;
  content: string;
  category: string;
  date: string;
  cvssScore?: number;
  isPopup?: boolean;
  popupExpiry?: string;
  sourceUrl?: string;
  youtubeUrl?: string;
}

/**
 * CVSS 8+ 보안 경보 팝업
 * - Firestore insights 중 isPopup: true && popupExpiry가 아직 유효한 항목을 표시
 * - 사용자가 닫으면 localStorage에 기록해 같은 알림은 재노출하지 않음
 * - 3일간 유지 (popupExpiry 기준)
 */
export default function SecurityAlertPopup() {
  const [alerts, setAlerts] = useState<AlertInsight[]>([]);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  useEffect(() => {
    // localStorage에서 닫은 알림 ID 복원
    try {
      const stored = localStorage.getItem('dismissed_security_alerts');
      if (stored) {
        const parsed = JSON.parse(stored) as { ids: string[]; ts: number };
        // 7일 지난 dismiss 기록은 정리
        if (Date.now() - parsed.ts < 7 * 86400000) {
          setDismissed(new Set(parsed.ids));
        } else {
          localStorage.removeItem('dismissed_security_alerts');
        }
      }
    } catch { /* ignore */ }

    // Firestore에서 최근 insights 조회
    const q = query(collection(db, 'insights'), orderBy('createdAt', 'desc'), limit(10));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const today = new Date().toISOString().split('T')[0];
      const results: AlertInsight[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data() as Omit<AlertInsight, 'id'>;
        if (
          data.isPopup === true &&
          data.popupExpiry &&
          data.popupExpiry >= today &&
          data.status !== 'draft' &&
          data.status !== 'archived'
        ) {
          results.push({ id: doc.id, ...data });
        }
      });
      setAlerts(results);
    }, (err) => {
      console.error('SecurityAlertPopup snapshot error:', err);
      try {
        handleFirestoreError(err, OperationType.LIST, 'insights');
      } catch { /* swallow */ }
    });

    return () => unsubscribe();
  }, []);

  const handleDismiss = (id: string) => {
    const newDismissed = new Set(dismissed);
    newDismissed.add(id);
    setDismissed(newDismissed);
    try {
      localStorage.setItem('dismissed_security_alerts', JSON.stringify({
        ids: Array.from(newDismissed),
        ts: Date.now()
      }));
    } catch { /* ignore */ }
  };

  const visibleAlerts = alerts.filter(a => !dismissed.has(a.id));
  if (visibleAlerts.length === 0) return null;

  // 가장 심각한(CVSS 높은) 알림을 메인으로
  const mainAlert = visibleAlerts.sort((a, b) => (b.cvssScore || 0) - (a.cvssScore || 0))[0];

  const severityColor = (mainAlert.cvssScore || 0) >= 9
    ? 'from-red-600 to-red-700'
    : 'from-orange-500 to-red-600';

  const severityLabel = (mainAlert.cvssScore || 0) >= 9 ? '긴급' : '높음';

  return (
    <AnimatePresence>
      {/* 화면 상단 고정 배너 */}
      <motion.div
        key={mainAlert.id}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed top-0 left-0 right-0 z-[9999]"
      >
        <div className={`bg-gradient-to-r ${severityColor} text-white shadow-2xl`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center justify-between gap-4">
              {/* 왼쪽: 아이콘 + 심각도 배지 */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex-shrink-0 bg-white/20 rounded-full p-2">
                  <AlertTriangle size={22} className="animate-pulse" />
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="bg-white/25 backdrop-blur text-xs font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {severityLabel}
                  </span>
                  {mainAlert.cvssScore && (
                    <span className="bg-black/20 text-xs font-bold px-2 py-1 rounded-full">
                      CVSS {mainAlert.cvssScore.toFixed(1)}
                    </span>
                  )}
                </div>

                {/* 제목 */}
                <p className="font-bold text-sm sm:text-base truncate">
                  {mainAlert.title}
                </p>
              </div>

              {/* 오른쪽: 링크 + 닫기 */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <a
                  href="/insights"
                  className="hidden sm:inline-flex items-center gap-1 bg-white/20 hover:bg-white/30 text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-lg transition-colors"
                >
                  자세히 <ExternalLink size={14} />
                </a>
                <button
                  onClick={() => handleDismiss(mainAlert.id)}
                  className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                  aria-label="알림 닫기"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 추가 알림이 있으면 개수 표시 */}
        {visibleAlerts.length > 1 && (
          <div className="bg-slate-900/90 backdrop-blur text-white text-center py-1 text-xs font-medium">
            <Shield size={12} className="inline mr-1" />
            {visibleAlerts.length - 1}건의 추가 보안 경보가 있습니다.{' '}
            <a href="/insights" className="underline hover:text-blue-300">전체 보기</a>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
