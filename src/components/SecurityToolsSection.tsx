import { motion } from 'motion/react';
import { Shield, Crosshair, ArrowRight, Zap, FileSearch, AlertTriangle, BarChart3, Bot, Target } from 'lucide-react';

export default function SecurityToolsSection() {
  const tools = [
    {
      name: '로뎀이지스 (Aegis)',
      tagline: 'AI 기반 취약점 자동 진단',
      icon: <Shield size={36} strokeWidth={1.5} />,
      color: 'from-emerald-500 to-teal-600',
      bgGlow: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20',
      badges: ['GS인증 신청중', '저작권 등록', '특허 3건'],
      features: [
        { icon: <FileSearch size={18} />, text: '주통기 72항목 + ISMS-P 자동 진단' },
        { icon: <Zap size={18} />, text: 'Planner-Inspector 이중 그래프 아키텍처' },
        { icon: <BarChart3 size={18} />, text: '서버·DBMS·네트워크·웹·SAST·DAST 원스톱' },
        { icon: <AlertTriangle size={18} />, text: 'YAML 기반 판정 규칙 + 해시 체인 감사 로그' },
      ],
      desc: 'KISA 주요정보통신기반시설 기술적 취약점 분석·평가 기준에 따라 자산을 자동 진단하고, AI가 판정 결과를 분석하여 위험평가 보고서까지 생성합니다. 수집과 판정을 분리하는 설계로 일관되고 재현 가능한 진단 결과를 보장합니다.',
    },
    {
      name: '로뎀아레스 (ARES)',
      tagline: 'AI 자율 모의해킹',
      icon: <Crosshair size={36} strokeWidth={1.5} />,
      color: 'from-red-500 to-rose-600',
      bgGlow: 'bg-red-500/10',
      borderColor: 'border-red-500/20',
      badges: ['NEW', 'AI 에이전트', '23종 공격 도구'],
      features: [
        { icon: <Bot size={18} />, text: 'AI 에이전트가 해커처럼 관찰→판단→실행→기록' },
        { icon: <Target size={18} />, text: 'OWASP Top 10 웹 도구 10종 + 인프라 도구 13종' },
        { icon: <Shield size={18} />, text: 'ScopeGuard 범위 통제 + KillSwitch 즉시 중단' },
        { icon: <FileSearch size={18} />, text: '취약점 발견 → 자동 보고서 생성' },
      ],
      desc: 'AI 에이전트가 실제 해커의 사고방식을 모방하여 웹 애플리케이션과 인프라의 보안 취약점을 자율적으로 탐색합니다. Aegis와 연계하면 취약점 진단→모의해킹→위험평가→보고서까지 원스톱으로 수행할 수 있습니다.',
    },
  ];

  return (
    <section className="py-[120px] bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold mb-6 tracking-wider uppercase">
            <Zap size={14} />
            <span>자체 개발 보안 도구</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            취약점 진단부터 위험평가까지
            <br />
            <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              원스톱으로 수행하는 전문 기업
            </span>
          </h2>
          <p className="mt-6 text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
            로뎀시스템은 컨설팅 경험에서 나온 실전 도구를 직접 설계·개발합니다.
            <br className="hidden md:block" />
            AI 기반 자동 진단과 자율 모의해킹으로 <strong className="text-slate-200">사람이 놓치는 취약점까지 찾아냅니다.</strong>
          </p>
        </motion.div>

        {/* Pipeline Flow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-16"
        >
          {['취약점 진단', '모의해킹', '위험평가', '보고서 생성'].map((step, i) => (
            <div key={step} className="flex items-center gap-3">
              <span className={`px-4 py-2 rounded-lg text-sm font-bold ${
                i === 0 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                i === 1 ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
                i === 2 ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                'bg-blue-500/20 text-blue-300 border border-blue-500/30'
              }`}>
                {step}
              </span>
              {i < 3 && <ArrowRight size={16} className="text-slate-600" />}
            </div>
          ))}
        </motion.div>

        {/* Tool Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`relative bg-slate-900/80 backdrop-blur-sm rounded-[20px] border ${tool.borderColor} p-8 md:p-10 group hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)]`}
            >
              {/* Glow */}
              <div className={`absolute top-0 right-0 w-64 h-64 ${tool.bgGlow} rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 pointer-events-none opacity-60`} />

              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-start gap-5 mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tool.color} flex items-center justify-center text-white shadow-lg flex-shrink-0`}>
                    {tool.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white tracking-tight">{tool.name}</h3>
                    <p className="text-slate-400 text-sm mt-1">{tool.tagline}</p>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {tool.badges.map(badge => (
                    <span key={badge} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-slate-300">
                      {badge}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <p className="text-slate-300 text-sm leading-relaxed mb-8">{tool.desc}</p>

                {/* Features */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {tool.features.map((f, fi) => (
                    <div key={fi} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                      <span className="text-slate-400 mt-0.5 flex-shrink-0">{f.icon}</span>
                      <span className="text-slate-300 text-sm font-medium">{f.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4">
            <a
              href="mailto:paeyoung.park@gmail.com?subject=%5B%EB%B3%B4%EC%95%88%20%EB%8F%84%EA%B5%AC%20%EB%AC%B8%EC%9D%98%5D"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white rounded-xl text-base font-extrabold shadow-[0_8px_24px_rgba(16,185,129,0.25)] transition-all hover:-translate-y-0.5"
            >
              <Shield size={18} />
              도입 및 데모 문의
              <ArrowRight size={16} />
            </a>
            <a
              href="https://aegis.lupa.kr"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 px-6 py-3.5 border border-emerald-700 hover:border-emerald-500 text-emerald-300 hover:text-white rounded-xl text-sm font-bold transition-all"
            >
              Aegis 상세 보기
              <ArrowRight size={14} />
            </a>
            <a
              href="https://ares.lupa.kr"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 px-6 py-3.5 border border-red-700 hover:border-red-500 text-red-300 hover:text-white rounded-xl text-sm font-bold transition-all"
            >
              ARES 상세 보기
              <ArrowRight size={14} />
            </a>
          </div>
          <p className="mt-6 text-sm text-slate-500">
            로뎀시스템이 직접 설계·개발한 독자 제품입니다. 소스 코드를 포함한 구축형 납품이 가능합니다.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
