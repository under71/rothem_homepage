import { motion } from 'motion/react';
import { Shield, Crosshair, Search, ArrowRight, Zap } from 'lucide-react';

const products = [
  {
    name: '로뎀이지스',
    sub: 'Aegis',
    tagline: 'AI 기반 취약점 자동 진단',
    desc: '주통기 72항목 + ISMS-P 자동 진단. Planner-Inspector 이중 그래프 아키텍처로 서버·DBMS·네트워크·웹·SAST·DAST 원스톱 수행.',
    icon: <Shield size={28} strokeWidth={1.8} />,
    color: 'from-emerald-500 to-teal-600',
    border: 'border-emerald-500/20 hover:border-emerald-500/50',
    glow: 'bg-emerald-500/10',
    badges: ['GS인증 시험신청', '특허 3건', '저작권'],
    url: 'https://aegis.rothemsystem.com',
  },
  {
    name: '로뎀아레스',
    sub: 'ARES',
    tagline: 'AI 자율 모의해킹',
    desc: 'AI 에이전트가 관찰→판단→실행→기록 루프를 자율 반복. OWASP Top 10 웹 도구 10종 + 인프라 도구 13종. ScopeGuard 범위 통제.',
    icon: <Crosshair size={28} strokeWidth={1.8} />,
    color: 'from-red-500 to-rose-600',
    border: 'border-red-500/20 hover:border-red-500/50',
    glow: 'bg-red-500/10',
    badges: ['AI 에이전트', '23종 도구'],
    url: 'https://ares.rothemsystem.com',
  },
  {
    name: 'Lupa',
    sub: '파일 검색',
    tagline: '기억의 조각으로 파일을 찾다',
    desc: '파일 이름이 기억 안 나도, 문서 속 단어 하나로 0.03초 검색. HWP 내용검색, 스캔 PDF OCR, AI 에이전트 MCP 연결. 100% 온디바이스.',
    icon: <Search size={28} strokeWidth={1.8} />,
    color: 'from-indigo-500 to-violet-600',
    border: 'border-indigo-500/20 hover:border-indigo-500/50',
    glow: 'bg-indigo-500/10',
    badges: ['macOS', 'Windows', 'MCP'],
    url: 'https://lupa.kr',
  },
];

export default function ProductShowcaseSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-400 text-xs font-bold mb-4 tracking-wider uppercase">
            <Zap size={14} />
            <span>자체 개발 제품</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            보안 도구부터 생산성 앱까지
          </h2>
          <p className="mt-3 text-slate-400 text-base max-w-2xl mx-auto">
            로뎀시스템이 직접 설계·개발한 독자 제품입니다.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <motion.a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`group relative bg-slate-900/80 backdrop-blur-sm rounded-2xl border ${p.border} p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.3)] block`}
            >
              <div className={`absolute top-0 right-0 w-40 h-40 ${p.glow} rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 pointer-events-none opacity-50`} />
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center text-white shadow-lg flex-shrink-0`}>
                    {p.icon}
                  </div>
                  <div>
                    <div className="text-lg font-black text-white">{p.name}</div>
                    <div className="text-xs text-slate-400 font-medium">{p.sub} · {p.tagline}</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.badges.map(b => (
                    <span key={b} className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold text-slate-400">
                      {b}
                    </span>
                  ))}
                </div>

                <p className="text-sm text-slate-300 leading-relaxed mb-5">{p.desc}</p>

                <div className="flex items-center gap-1.5 text-sm font-bold text-slate-400 group-hover:text-white transition-colors">
                  자세히 보기 <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
