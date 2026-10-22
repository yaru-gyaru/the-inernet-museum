import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

const eras = [
  {
    year: '1994', range: '1990-е', tag: 'THE FIRST CONNECTION', title: 'Когда интернет был открытием',
    subtitle: 'Телефонная линия, шум модема и целый мир за ссылкой.', color: '#e6bc7c',
    icon: '⌘', exhibit: 'Всемирная паутина', type: 'web',
    fact: 'В 1991 году Тим Бернерс-Ли опубликовал первый веб-сайт. Его страницы были текстовыми и связывались гиперссылками.',
    lesson: 'Сайты не всегда были картинками и видео. Гиперссылка — главное изобретение, которое превратило отдельные документы в паутину.',
    question: 'Что связывало первые веб-страницы между собой?', options: ['Гиперссылки', 'Лайки', 'Хештеги'], answer: 0,
    archive: 'Первый сайт CERN', archiveUrl: 'https://info.cern.ch/'
  },
  {
    year: '2003', range: '2000-е', tag: 'YOU HAVE A MESSAGE', title: 'Интернет находит друзей',
    subtitle: 'Никнеймы, форумы, статусы «в сети» и страницы, сделанные своими руками.', color: '#8ed7c2',
    icon: '✳', exhibit: 'Форумы и мессенджеры', type: 'forum',
    fact: 'В 2000-х форумы и мессенджеры сделали общение в сети повседневным. У каждого сообщества были свои темы, правила и язык.',
    lesson: 'Форумы группировали разговоры по темам. В отличие от общей ленты, обсуждение могло продолжаться годами и оставалось доступным для поиска.',
    question: 'Как обычно организован разговор на форуме?', options: ['По темам и веткам', 'По геолокации', 'По длительности видео'], answer: 0,
    archive: 'Архив веб-страниц', archiveUrl: 'https://web.archive.org/'
  },
  {
    year: '2012', range: '2010-е', tag: 'ALWAYS ONLINE', title: 'Весь мир в кармане',
    subtitle: 'Смартфоны, бесконечные ленты и культура мгновенного обмена.', color: '#b8a7ec',
    icon: '◈', exhibit: 'Социальная лента', type: 'feed',
    fact: 'В 2010-х смартфон стал главным способом выхода в интернет для миллионов людей. Сайты стали подстраиваться под маленькие экраны.',
    lesson: 'Лента собирает публикации в один поток. Удобство такого формата изменило то, как мы находим новости, друзей и творчество.',
    question: 'Почему дизайн сайтов в 2010-х стал меняться?', options: ['Люди чаще заходили с телефонов', 'Исчезли ссылки', 'Перестал работать текст'], answer: 0,
    archive: 'История адаптивного дизайна', archiveUrl: 'https://www.w3.org/standards/webdesign/'
  }
];

function Grain() { return <div className="grain" aria-hidden="true" />; }

function Starfield() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width, height, points, frame;
    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      points = Array.from({ length: Math.min(95, Math.floor(width / 15)) }, () => ({
        x: Math.random() * width, y: Math.random() * height, r: Math.random() * 1.5 + .25, drift: Math.random() * .16 + .04
      }));
    };
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#bbcbcb';
      points.forEach(p => { p.y -= p.drift; if (p.y < 0) p.y = height; ctx.globalAlpha = .15 + p.r * .17; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill(); });
      frame = requestAnimationFrame(draw);
    };
    resize(); draw(); window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvasRef} className="starfield" aria-hidden="true" />;
}

function Icon({ name, size = 18 }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };
  const paths = {
    arrow: <><path d="M4 12h16m-7-7 7 7-7 7" /></>,
    external: <><path d="M13 5h6v6M19 5l-9 9" /><path d="M19 13v6H5V5h6" /></>,
    sound: <><path d="M4 9v6h4l5 4V5L8 9H4Z" /><path d="M17 9a5 5 0 0 1 0 6m2-9a9 9 0 0 1 0 12" /></>,
    mute: <><path d="M4 9v6h4l5 4V5L8 9H4Z" /><path d="m17 9 5 6m0-6-5 6" /></>,
    close: <><path d="M5 5 19 19M19 5 5 19" /></>,
    spark: <><path d="m12 2 1.7 6.3L20 10l-6.3 1.7L12 18l-1.7-6.3L4 10l6.3-1.7L12 2Zm7 15 .7 2.3L22 20l-2.3.7L19 23l-.7-2.3L16 20l2.3-.7L19 17Z" /></>
  };
  return <svg {...common}>{paths[name]}</svg>;
}

function WebExhibit() {
  const [page, setPage] = useState('home');
  return <div className="web-app">
    <div className="browser-bar"><span className="tiny-controls"><i /><i /><i /></span><span className="address">http://museum.net/{page === 'home' ? 'index.html' : `${page}.html`}</span><span className="browser-menu">☷</span></div>
    <div className="old-web">
      <div className="old-web-top"><span>✦</span> THE WORLD WIDE WEB <span>✦</span></div>
      <h3>{page === 'home' ? 'Добро пожаловать в сеть!' : page === 'links' ? 'Каталог ссылок' : 'Гостевая книга'}</h3>
      {page === 'home' ? <><p>Вы подключились к глобальной сети. Здесь каждый документ — дверь в следующий.</p><p className="under-construction">🚧 &nbsp; Страница находится в разработке &nbsp; 🚧</p></> : page === 'links' ? <ul><li>История Всемирной паутины</li><li>Компьютерные клубы</li><li>Музыка и культура</li></ul> : <p>Привет, путешественник! Оставить сообщение можно было в гостевой книге — предке комментариев.</p>}
      <div className="old-links"><button onClick={() => setPage('home')}>Главная</button><button onClick={() => setPage('links')}>Ссылки</button><button onClick={() => setPage('guest')}>Гостевая</button></div>
      <small>Последнее обновление: 14.06.1994 · Счётчик посещений: 000184</small>
    </div>
  </div>;
}

function ForumExhibit() {
  const [topic, setTopic] = useState(0);
  const topics = [
    { title: 'Как вы впервые вышли в интернет?', author: 'pixel_cat', replies: 24, text: 'Помните этот звук подключения? Мы всей семьёй ждали, пока освободится телефонная линия.' },
    { title: 'Ваши любимые сайты нулевых', author: 'websurfer', replies: 18, text: 'Я собирал ссылки в закладках и делился ими с друзьями. У каждого был свой маленький уголок сети.' },
    { title: 'Какой у вас статус в мессенджере?', author: 'neon_star', replies: 42, text: '«Отошёл» на пять минут, вернулся через три часа. Знакомая история?' }
  ];
  return <div className="forum-app"><div className="forum-header"><span className="forum-mark">@</span><div><strong>NETSPACE</strong><small>форум обо всём · с 2003 года</small></div><span className="online-dot">● 128 online</span></div><div className="forum-nav">Главная &nbsp; / &nbsp; Сообщество &nbsp; / &nbsp; Разговоры</div><div className="forum-content"><div className="forum-top"><span>ТЕМЫ ФОРУМА</span><span>ОТВЕТЫ</span></div>{topics.map((item, i) => <button className={`forum-topic ${topic === i ? 'active' : ''}`} key={item.title} onClick={() => setTopic(i)}><span className="forum-bubble">▣</span><span><strong>{item.title}</strong><small>от {item.author}</small></span><em>{item.replies}</em></button>)}<div className="forum-post"><div className="forum-avatar">{topics[topic].author.slice(0, 1).toUpperCase()}</div><div><strong>{topics[topic].author}</strong><p>{topics[topic].text}</p></div></div></div></div>;
}

function FeedExhibit() {
  const [liked, setLiked] = useState(false);
  const [tab, setTab] = useState('Лента');
  return <div className="feed-app"><div className="feed-top"><span className="feed-brand">moment<span>•</span></span><span>◉ &nbsp; ◇</span></div><div className="feed-tabs">{['Лента', 'Поиск', 'Профиль'].map(t => <button className={tab === t ? 'active' : ''} onClick={() => setTab(t)} key={t}>{t}</button>)}</div>{tab === 'Лента' ? <div className="feed-post"><div className="feed-author"><span className="feed-avatar">m</span><strong>museum.archive</strong><span>•••</span></div><div className="feed-photo"><div className="sun" /><div className="hill hill-back" /><div className="hill hill-front" /><span>somewhere on the internet</span></div><div className="feed-actions"><button onClick={() => setLiked(!liked)} aria-label={liked ? 'Убрать отметку нравится' : 'Поставить отметку нравится'} className={liked ? 'liked' : ''}>{liked ? '♥' : '♡'}</button><span>☏ &nbsp; ◇</span></div><p><strong>{liked ? '1 205' : '1 204'} отметки</strong></p><p><strong>museum.archive</strong> Впервые весь интернет всегда с тобой. #цифроваякультура</p></div> : <div className="feed-placeholder"><span>{tab === 'Поиск' ? '⌕' : '◉'}</span><strong>{tab === 'Поиск' ? 'Открывай новое' : 'Твой цифровой след'}</strong><p>{tab === 'Поиск' ? 'Хештеги помогли находить людей и идеи.' : 'Профиль стал личной витриной в сети.'}</p></div>}</div>;
}

function Exhibit({ era }) {
  return <div className={`exhibit-window ${era.type}`} key={era.type}><div className="exhibit-heading"><span className="live-pulse" /> ИНТЕРАКТИВНЫЙ ЭКСПОНАТ <span className="exhibit-no">EXHIBIT 0{eras.indexOf(era) + 1}</span></div><div className="exhibit-frame">{era.type === 'web' ? <WebExhibit /> : era.type === 'forum' ? <ForumExhibit /> : <FeedExhibit />}</div><div className="exhibit-hint">↗ Нажимайте на элементы интерфейса, чтобы исследовать эпоху</div></div>;
}

function App() {
  const [active, setActive] = useState(0);
  const [answer, setAnswer] = useState(null);
  const [sound, setSound] = useState(false);
  const [intro, setIntro] = useState(true);
  const era = eras[active];
  const audioRef = useRef(null);
  const goToEra = (i) => { setActive(i); setAnswer(null); document.getElementById('era-explore')?.scrollIntoView({ behavior: 'smooth' }); };
  const playTone = () => {
    if (!sound) return;
    try { const ctx = audioRef.current || (audioRef.current = new (window.AudioContext || window.webkitAudioContext)()); const osc = ctx.createOscillator(); const gain = ctx.createGain(); osc.type = 'sine'; osc.frequency.setValueAtTime(520, ctx.currentTime); osc.frequency.exponentialRampToValueAtTime(720, ctx.currentTime + .08); gain.gain.setValueAtTime(.025, ctx.currentTime); gain.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + .14); osc.connect(gain); gain.connect(ctx.destination); osc.start(); osc.stop(ctx.currentTime + .14); } catch { /* audio is optional */ }
  };
  useEffect(() => { if (sound) playTone(); }, [active]);
  return <div className="app" style={{ '--era-color': era.color }}><Starfield /><Grain />
    <header className="site-header"><a href="#top" className="brand" aria-label="На главную"><span className="brand-orbit">◎</span><span>THE INTERNET<br /><b>MUSEUM</b></span></a><nav><a href="#journey">Эпохи</a><a href="#era-explore">Экспонаты</a><a href="#about">О музее</a></nav><button className="sound-btn" onClick={() => setSound(!sound)} aria-label={sound ? 'Выключить звук' : 'Включить звук'}><Icon name={sound ? 'sound' : 'mute'} size={17} /><span>ЗВУК {sound ? 'ВКЛ' : 'ВЫКЛ'}</span></button></header>
    <main id="top"><section className="hero"><div className="hero-copy"><div className="eyebrow"><span className="eyebrow-line" /> ЦИФРОВОЙ АРХИВ · EST. 2024</div><h1>Помнишь,<br />каким был <em>интернет?</em></h1><p>Открой портал в эпоху, когда каждая новая страница казалась чудом. Исследуй интерфейсы, звуки и истории, изменившие нашу жизнь.</p><div className="hero-actions"><a className="primary-btn" href="#journey" onClick={playTone}>Начать путешествие <Icon name="arrow" /></a><span className="hero-note">← три эпохи · бесконечно воспоминаний</span></div></div><div className="hero-art" aria-label="Иллюстрация старого компьютера"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="floating-label label-top">CONNECTING TO THE PAST <span>↗</span></div><div className="floating-label label-bottom">MEMORY_001/003</div><div className="computer"><div className="computer-shell"><div className="computer-screen"><div className="screen-glow"><div className="screen-top">C:\INTERNET\MEMORIES.EXE <span>_ □ ×</span></div><div className="screen-inner"><div className="pixel-globe">◎</div><div className="screen-title">WELCOME TO<br /><span>THE INTERNET</span></div><div className="screen-sub">Press ENTER to explore the past_</div><div className="progress"><span /></div></div></div></div><div className="computer-bottom"><span className="power-light" /><span>MUSEUM 94</span><span className="disk-slot" /></div></div><div className="computer-stand" /><div className="computer-foot" /></div><div className="art-shadow" /></div><div className="hero-index"><span>01 / 03</span><div><i /> <i /> <i /></div><span>SCROLL TO EXPLORE ↓</span></div></section>
      <section className="intro-strip" id="journey"><div className="strip-mark">✳</div><p>Это не просто история технологий.<br /><strong>Это история того, как мы научились быть вместе онлайн.</strong></p><span>ПРОКРУТИ ВРЕМЯ →</span></section>
      <section className="journey-section"><div className="section-heading"><div><span className="section-kicker">01 — ПУТЕШЕСТВИЕ ВО ВРЕМЕНИ</span><h2>Выбери свою <em>эпоху</em></h2></div><p>Три главы одной истории.<br />С какой начнётся твоя?</p></div><div className="timeline-line"><span>1990</span><span>2000</span><span>2010</span><span>СЕГОДНЯ</span></div><div className="era-grid">{eras.map((item, i) => <button key={item.year} className={`era-card ${active === i ? 'selected' : ''}`} onClick={() => { playTone(); goToEra(i); }} style={{ '--card-color': item.color }}><div className="era-card-top"><span>0{i + 1} / ЭПОХА</span><span className="era-card-arrow"><Icon name="arrow" size={17} /></span></div><div className="era-card-art"><span className="era-art-ring ring-a" /><span className="era-art-ring ring-b" /><span className="era-art-icon">{item.icon}</span></div><div className="era-card-content"><span>{item.tag}</span><h3>{item.year}<small>→</small></h3><p>{item.title}</p></div></button>)}</div></section>
      <section className="explore-section" id="era-explore"><div className="explore-header"><div><span className="section-kicker">02 — ИНТЕРАКТИВНАЯ ЭКСПОЗИЦИЯ</span><h2>Открой <em>{era.range}</em></h2><p>{era.subtitle}</p></div><div className="era-switch" aria-label="Переключить эпоху">{eras.map((item, i) => <button key={item.year} className={active === i ? 'active' : ''} onClick={() => { playTone(); setActive(i); setAnswer(null); }}>{item.year}</button>)}</div></div><div className="explore-grid"><Exhibit era={era} /><div className="lesson-column"><div className="lesson-card"><span className="lesson-label">✳ &nbsp; ЗНАЕШЬ ЛИ ТЫ?</span><h3>{era.exhibit}</h3><p>{era.fact}</p><div className="lesson-divider" /><span className="lesson-label muted">ПОЧЕМУ ЭТО ВАЖНО</span><p>{era.lesson}</p><a href={era.archiveUrl} target="_blank" rel="noreferrer">Заглянуть в архив <Icon name="external" size={15} /></a></div><div className="quiz-card"><span className="lesson-label">МИНИ-ВИКТОРИНА / 01</span><h3>{era.question}</h3><div className="quiz-options">{era.options.map((option, i) => <button key={option} onClick={() => { playTone(); setAnswer(i); }} className={answer === i ? (i === era.answer ? 'correct' : 'incorrect') : ''}><span>{String.fromCharCode(65 + i)}</span>{option}</button>)}</div>{answer !== null && <p className={`quiz-feedback ${answer === era.answer ? 'good' : ''}`}>{answer === era.answer ? 'Верно! Ты уловил главное.' : 'Почти! Попробуй другой ответ.'}</p>}</div></div></div><div className="explore-footer"><span>ТЫ НАХОДИШЬСЯ В ЭПОХЕ {era.range}</span><button onClick={() => { playTone(); setActive((active + 1) % eras.length); setAnswer(null); }}>{active === 2 ? 'Вернуться в 1990-е' : 'Следующая эпоха'} <Icon name="arrow" /></button></div></section>
      <section className="closing" id="about"><div className="closing-symbol">◎</div><span className="section-kicker">ПОСЛЕДНЯЯ СТРАНИЦА?</span><h2>Интернет меняется.<br /><em>Любопытство остаётся.</em></h2><p>Этот музей — маленькое окно в большую историю сети. Исследуй, сравнивай и вспоминай, как всё начиналось.</p><a href="#top" className="primary-btn">Начать сначала <Icon name="arrow" /></a></section></main><footer><span>◎ THE INTERNET MUSEUM</span><span>СОЗДАНО ДЛЯ ЛЮБОПЫТНЫХ УМОВ</span><span>© 2026 · ЦИФРОВОЙ МУЗЕЙ</span></footer>
  </div>;
}

createRoot(document.getElementById('root')).render(<App />);
