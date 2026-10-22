import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

const eras = [
  {
    year: '1994', range: '1990-е', tag: 'DIAL-UP / 01', title: 'Один клик — целая вселенная',
    subtitle: 'Пока модем занимал телефонную линию, каждая новая ссылка была маршрутом в неизвестное.', color: '#c7ff5b', secondary: '#39b8ff',
    signal: 'DIAL-UP SIGNAL', screen: 'WORLD WIDE WEB', screenSub: 'Соединение установлено_',
    exhibit: 'Всемирная паутина', type: 'web',
    fact: 'Представь экран без фото и видео. Только текст и подчёркнутая ссылка. В 1991 году именно так выглядел первый сайт Тима Бернерса-Ли.',
    lesson: 'Главным спецэффектом был переход: один документ открывал другой. Из этой простой идеи выросла Всемирная паутина.',
    details: [
      { year: '1989', title: 'Сеть на листе бумаги', text: 'Тим Бернерс-Ли предлагает связать документы ссылками. Пока это только идея внутри CERN.' },
      { year: '1991', title: 'Страница номер один', text: 'Первый сайт объясняет, что такое WWW. Интернет буквально учит посетителей пользоваться собой.' },
      { year: '1993', title: 'Дверь открыта всем', text: 'CERN делает технологию WWW свободно доступной. Теперь собственную страницу может создать кто угодно.' }
    ],
    mission: 'Найди страницу pixel_cat в каталоге и оставь запись в гостевой книге.',
    route: ['Главная', 'Каталог', 'pixel_cat', 'Гостевая'],
    artifact: { title: 'Первая веб-страница', note: 'CERN · подлинная страница проекта WWW', url: 'https://info.cern.ch/hypertext/WWW/TheProject.html' }
  },
  {
    year: '2003', range: '2000-е', tag: 'USER ONLINE / 02', title: 'Твой ник знают на форуме',
    subtitle: 'У каждого сообщества свой язык, а у каждой беседы — ветка, которая могла жить годами.', color: '#39f5e7', secondary: '#ff5cad',
    signal: 'MESSAGE RECEIVED', screen: 'YOU ARE ONLINE', screenSub: 'Новых сообщений: 03_',
    exhibit: 'Форумы и мессенджеры', type: 'forum',
    fact: 'Ты заходишь под ником, открываешь любимую ветку и видишь ответ от человека с другого конца света. В нулевые сеть стала местом встреч.',
    lesson: 'Форум помнил разговор: тема оставалась на месте и через неделю, и через год. Так вокруг интересов собирались целые сообщества.',
    details: [
      { year: '2001', title: 'Энциклопедия без редакции', text: 'Появляется Википедия. Теперь любой может не только читать статью, но и исправить её.' },
      { year: '2003', title: '«Ты меня слышишь?»', text: 'Skype превращает компьютер в телефон. Разговор через океан становится частью вечера.' },
      { year: '2005', title: 'У каждого свой эфир', text: 'YouTube даёт домашнему видео зрителей далеко за пределами семьи и друзей.' }
    ],
    mission: 'Найди тему pixel_cat через поиск форума и напиши ответ.',
    route: ['Форум', 'Поиск', 'Тема pixel_cat', 'Ответ'],
    artifact: { title: 'Архив форума phpBB 2.0.x', note: 'Реальные обсуждения сообщества нулевых', url: 'https://www.phpbb.com/community/viewforum.php?f=295' }
  },
  {
    year: '2012', range: '2010-е', tag: 'ALWAYS ON / 03', title: 'Мир не выходит из сети',
    subtitle: 'Камера, лента и уведомления переехали в карман. Интернет перестал ждать у рабочего стола.', color: '#b388ff', secondary: '#ff63bd',
    signal: 'LIVE FEED ACTIVE', screen: 'ALWAYS CONNECTED', screenSub: 'Лента обновляется_',
    exhibit: 'Социальная лента', type: 'feed',
    fact: 'Снимок сделан — и через секунду его видят друзья. В 2010-х смартфон превратил публикацию в действие на ходу.',
    lesson: 'Лента собрала людей, новости и творчество в один поток. Удобство оказалось настолько сильным, что изменило сам способ искать новое.',
    details: [
      { year: '2010', title: 'Снял — показал', text: 'Instagram делает фотографию сообщением: кадр, подпись, публикация за несколько секунд.' },
      { year: '2012', title: 'Сайт под большой палец', text: 'Экран в кармане требует нового дизайна: крупнее кнопки, гибче страницы, короче путь к действию.' },
      { year: '2010-е', title: 'Поток без паузы', text: 'Лента подхватывает следующий пост ещё до того, как ты успел закрыть предыдущий.' }
    ],
    mission: 'Найди профиль pixel_cat в поиске и отправь личное сообщение.',
    route: ['Лента', 'Поиск', 'Профиль pixel_cat', 'Сообщение'],
    artifact: { title: 'Instagram выходит на Android', note: 'Запись официального блога · апрель 2012', url: 'https://instagram.tumblr.com/post/20411305253/instagram-for-android-available-now' }
  }
];

function Grain() { return <div className="grain" aria-hidden="true" />; }

function EraSymbol({ type }) {
  const shared = { fill: 'none', stroke: 'currentColor', strokeWidth: 3.5, strokeLinecap: 'round', strokeLinejoin: 'round' };
  return <svg className={`era-symbol era-symbol-${type}`} viewBox="0 0 120 120" aria-hidden="true" {...shared}>
    {type === 'web' && <>
      <rect x="12" y="19" width="96" height="78" rx="5" />
      <path d="M12 37h96M23 28h1m8 0h1m8 0h1" />
      <circle cx="44" cy="64" r="10" /><circle cx="77" cy="55" r="10" /><circle cx="79" cy="80" r="10" />
      <path d="m53 61 14-4m-17 14 20 7m-1-15 5 8" />
    </>}
    {type === 'forum' && <>
      <path d="M17 27h68a7 7 0 0 1 7 7v32a7 7 0 0 1-7 7H46L28 87V73H17a7 7 0 0 1-7-7V34a7 7 0 0 1 7-7Z" />
      <path d="M36 42h40M36 54h27" />
      <path d="M91 48h10a7 7 0 0 1 7 7v28a7 7 0 0 1-7 7h-7v13L79 90H59a7 7 0 0 1-7-7v-4" />
    </>}
    {type === 'feed' && <>
      <rect x="32" y="8" width="56" height="104" rx="9" />
      <path d="M50 19h20M32 29h56M32 96h56" />
      <rect x="43" y="39" width="34" height="30" rx="2" />
      <path d="m47 63 9-10 7 6 5-5 6 9M44 78h31M44 86h22" />
      <circle cx="60" cy="103" r="2" />
    </>}
  </svg>;
}

function EpochAtmosphere({ era }) {
  return <div className={`epoch-atmosphere atmosphere-${era.type}`} aria-hidden="true">
    <div className="atmosphere-grid" />
    <div className="atmosphere-glow glow-one" />
    <div className="atmosphere-glow glow-two" />
    <div className="atmosphere-orbit orbit-outer" />
    <div className="atmosphere-orbit orbit-inner" />
    <div className="atmosphere-glyph"><EraSymbol type={era.type} /></div>
    <div className="atmosphere-rail rail-left"><span>NET / {era.year}</span><i /><span>{era.signal}</span></div>
    <div className="atmosphere-rail rail-right"><span>0{eras.indexOf(era) + 1} / 03</span><i /><span>ARCHIVE ONLINE</span></div>
  </div>;
}

function Starfield() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
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
      points.forEach(p => { if (!reducedMotion.matches) p.y -= p.drift; if (p.y < 0) p.y = height; ctx.globalAlpha = .15 + p.r * .17; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill(); });
      if (!reducedMotion.matches) frame = requestAnimationFrame(draw);
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

function WebExhibit({ onStage, onComplete, done }) {
  const [page, setPage] = useState('home');
  const [message, setMessage] = useState('');
  const openPage = (next) => {
    setPage(next);
    if (next === 'links') onStage(1);
    if (next === 'guest') onStage(2);
  };
  const leaveMessage = (event) => {
    event.preventDefault();
    if (!message.trim()) return;
    onComplete();
    setMessage('');
  };
  return <div className="web-app">
    <div className="browser-bar"><span className="tiny-controls"><i /><i /><i /></span><span className="address">http://museum.net/{page === 'home' ? 'index.html' : `${page}.html`}</span><span className="browser-menu">☷</span></div>
    <div className="old-web">
      <div className="old-web-top"><span>✦</span> THE WORLD WIDE WEB <span>✦</span></div>
      <h3>{page === 'home' ? 'Добро пожаловать в сеть!' : page === 'links' ? 'Каталог ссылок' : 'Страница pixel_cat'}</h3>
      {page === 'home' && <><p>На этом сайте нет поиска людей. Начни с каталога и переходи по ссылкам — так находили знакомых в раннем вебе.</p><p className="under-construction">🚧 &nbsp; Страница ещё строится &nbsp; 🚧</p></>}
      {page === 'links' && <div className="old-directory"><p>Личные страницы / друзья сети:</p><button onClick={() => openPage('guest')}>→ pixel_cat — компьютер, музыка и гостевая книга</button><span>→ websurfer — коллекция ссылок</span><span>→ modem_56k — советы по подключению</span></div>}
      {page === 'guest' && <div className="guestbook"><p>Ты нашёл страницу pixel_cat. В 1994-м сообщение оставили бы здесь, на виду у всех посетителей.</p>{done ? <strong className="sim-success">Запись оставлена. Маршрут 1994 года пройден.</strong> : <form onSubmit={leaveMessage}><label htmlFor="guest-message">Твоя запись для pixel_cat</label><input id="guest-message" value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Привет! Нашёл твою страницу..." maxLength={100} required /><button type="submit">Оставить запись →</button></form>}</div>}
      <div className="old-links"><button onClick={() => openPage('home')}>Главная</button><button onClick={() => openPage('links')}>Каталог</button><button onClick={() => openPage('guest')}>Гостевая</button></div>
      <small>Последнее обновление: 14.06.1994 · Счётчик посещений: 000184</small>
    </div>
  </div>;
}

function ForumExhibit({ onStage, onComplete, done }) {
  const [topic, setTopic] = useState(1);
  const [query, setQuery] = useState('');
  const [reply, setReply] = useState('');
  const topics = [
    { title: 'Ищу друзей из старого веба', author: 'pixel_cat', replies: 24, text: 'Когда-то у меня была личная страница с гостевой книгой. Если мы там встречались — напишите сюда!' },
    { title: 'Ваши любимые сайты нулевых', author: 'websurfer', replies: 18, text: 'Я собирал ссылки в закладках и делился ими с друзьями. У каждого был свой маленький уголок сети.' },
    { title: 'Какой у вас статус в мессенджере?', author: 'neon_star', replies: 42, text: '«Отошёл» на пять минут, вернулся через три часа. Знакомая история?' }
  ];
  const visibleTopics = topics.map((item, i) => ({ ...item, index: i })).filter((item) => `${item.title} ${item.author}`.toLowerCase().includes(query.toLowerCase()));
  const submitReply = (event) => {
    event.preventDefault();
    if (!reply.trim()) return;
    onComplete();
    setReply('');
  };
  return <div className="forum-app">
    <div className="forum-header"><span className="forum-mark">@</span><div><strong>NETSPACE</strong><small>форум обо всём · с 2003 года</small></div><span className="online-dot">● 128 online</span></div>
    <div className="forum-nav">Главная &nbsp; / &nbsp; Сообщество &nbsp; / &nbsp; Разговоры</div>
    <div className="forum-content">
      <label className="forum-search">Поиск по темам<input value={query} onChange={(event) => { setQuery(event.target.value); if (event.target.value.trim()) onStage(1); }} placeholder="Попробуй pixel_cat" /></label>
      <div className="forum-top"><span>ТЕМЫ ФОРУМА</span><span>ОТВЕТЫ</span></div>
      {visibleTopics.length ? visibleTopics.map((item) => <button className={`forum-topic ${topic === item.index ? 'active' : ''}`} key={item.title} onClick={() => { setTopic(item.index); onStage(item.index === 0 ? 2 : 1); }}><span className="forum-bubble">▣</span><span><strong>{item.title}</strong><small>от {item.author}</small></span><em>{item.replies}</em></button>) : <p className="forum-empty">Ничего не найдено. Попробуй другой ник.</p>}
      <div className="forum-post"><div className="forum-avatar">{topics[topic].author.slice(0, 1).toUpperCase()}</div><div><strong>{topics[topic].author}</strong><p>{topics[topic].text}</p></div></div>
      {topic === 0 && (done ? <strong className="forum-success">Ответ сохранён. Маршрут 2003 года пройден.</strong> : <form className="forum-reply" onSubmit={submitReply}><label htmlFor="forum-message">Ответить pixel_cat</label><input id="forum-message" value={reply} onChange={(event) => setReply(event.target.value)} placeholder="Помню твою гостевую книгу..." maxLength={100} required /><button type="submit">Отправить ответ →</button></form>)}
    </div>
  </div>;
}

function FeedExhibit({ onStage, onComplete, done }) {
  const [liked, setLiked] = useState(false);
  const [tab, setTab] = useState('Лента');
  const [query, setQuery] = useState('');
  const [profileOpen, setProfileOpen] = useState(false);
  const [message, setMessage] = useState('');
  const chooseTab = (next) => { setTab(next); if (next === 'Поиск') onStage(1); };
  const submitMessage = (event) => {
    event.preventDefault();
    if (!message.trim()) return;
    onComplete();
    setMessage('');
  };
  return <div className="feed-app">
    <div className="feed-top"><span className="feed-brand">moment<span>•</span></span><span>◉ &nbsp; ◇</span></div>
    <div className="feed-tabs">{['Лента', 'Поиск', 'Профиль'].map((item) => <button className={tab === item ? 'active' : ''} onClick={() => chooseTab(item)} key={item}>{item}</button>)}</div>
    {tab === 'Лента' && <div className="feed-post"><div className="feed-author"><span className="feed-avatar">m</span><strong>museum.archive</strong><span>•••</span></div><div className="feed-photo"><div className="sun" /><div className="hill hill-back" /><div className="hill hill-front" /><span>somewhere on the internet</span></div><div className="feed-actions"><button onClick={() => setLiked(!liked)} aria-label={liked ? 'Убрать отметку нравится' : 'Поставить отметку нравится'} className={liked ? 'liked' : ''}>{liked ? '♥' : '♡'}</button><span>☏ &nbsp; ◇</span></div><p><strong>{liked ? '1 205' : '1 204'} отметки</strong></p><p><strong>museum.archive</strong> Пока кадр загружается, кто-то на другом конце города уже листает дальше. #всегдаонлайн</p></div>}
    {tab === 'Поиск' && <div className="feed-search"><strong>Найди знакомого</strong><p>В ленте проще искать не страницу, а профиль.</p><label htmlFor="feed-search">Поиск по нику</label><input id="feed-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="pixel_cat" />{query.toLowerCase().includes('pixel') && <button className="feed-result" onClick={() => { setProfileOpen(true); setTab('Профиль'); onStage(2); }}><span className="feed-avatar">p</span><span><strong>pixel_cat</strong><small>Знакомый из старого веба</small></span><span>→</span></button>}</div>}
    {tab === 'Профиль' && (profileOpen ? <div className="feed-profile"><div className="feed-profile-head"><span className="feed-avatar">p</span><div><strong>pixel_cat</strong><small>Снова в сети · 2012</small></div></div><p>От гостевой книги до карманного экрана. Рад видеть старых знакомых!</p>{done ? <strong className="feed-success">Сообщение сохранено. Маршрут 2012 года пройден.</strong> : <form onSubmit={submitMessage}><label htmlFor="feed-message">Личное сообщение</label><input id="feed-message" value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Привет, помнишь 1994-й?" maxLength={100} required /><button type="submit">Написать →</button></form>}</div> : <div className="feed-placeholder"><span>◉</span><strong>Твой цифровой след</strong><p>Найди pixel_cat через вкладку «Поиск».</p></div>)}
  </div>;
}

function MissionPanel({ era, active, completed, onSelectEra }) {
  return <div className="mission-panel">
    <div className="mission-copy"><span className="section-kicker">МАРШРУТ / НАЙТИ PIXEL_CAT</span><h3>{era.mission}</h3><p>Три способа связаться с одним человеком. Действия в экспонатах — музейная симуляция; сообщения никуда не отправляются.</p></div>
    <div className="mission-steps" aria-label="Этапы маршрута">{eras.map((item, i) => <button key={item.year} className={active === i ? 'active' : ''} aria-current={active === i ? 'step' : undefined} onClick={() => onSelectEra(i)}><span>0{i + 1} / {item.year}</span><strong>{completed[i] ? 'ПРОЙДЕНО ✓' : active === i ? 'СЕЙЧАС' : 'ВПЕРЕДИ'}</strong></button>)}</div>
    {completed[active] && <button className="mission-next" onClick={() => onSelectEra(completed.every(Boolean) ? 0 : (active + 1) % eras.length)}>{completed.every(Boolean) ? 'Вернуться к первой эпохе' : 'Продолжить в следующей эпохе'} <Icon name="arrow" size={16} /></button>}
  </div>;
}

function NetworkMap({ era, stage }) {
  return <div className="network-map" key={era.type}>
    <div className="network-map-head"><span className="section-kicker">ЖИВАЯ КАРТА СЕТИ</span><span>{era.signal} / {stage + 1} ИЗ 4 УЗЛОВ</span></div>
    <div className="network-track" style={{ '--map-step': stage }}>
      <span className="network-progress" aria-hidden="true" />
      {era.route.map((node, i) => <div className={`network-node ${i <= stage ? 'visited' : ''} ${i === stage ? 'current' : ''}`} key={node}><span className="network-dot">0{i + 1}</span><span className="network-name">{node}</span></div>)}
    </div>
  </div>;
}

function Exhibit({ era, onStage, onComplete, done }) {
  return <div className={`exhibit-window ${era.type}`} key={era.type}>
    <div className="exhibit-heading"><span className="live-pulse" /> ИНТЕРАКТИВНЫЙ ЭКСПОНАТ <span className="exhibit-no">EXHIBIT 0{eras.indexOf(era) + 1}</span></div>
    <div className="exhibit-frame">{era.type === 'web' ? <WebExhibit onStage={onStage} onComplete={onComplete} done={done} /> : era.type === 'forum' ? <ForumExhibit onStage={onStage} onComplete={onComplete} done={done} /> : <FeedExhibit onStage={onStage} onComplete={onComplete} done={done} />}</div>
    <div className="exhibit-hint">↗ {era.type === 'web' ? 'Ищи pixel_cat в каталоге' : era.type === 'forum' ? 'Найди тему по нику и ответь' : 'Найди профиль через поиск'}</div>
    <div className="artifact-card"><span>ПОДЛИННЫЙ АРТЕФАКТ / {era.year}</span><a href={era.artifact.url} target="_blank" rel="noopener noreferrer">{era.artifact.title} <Icon name="external" size={16} /></a><p>{era.artifact.note}. Откроется на другом сайте.</p></div>
  </div>;
}

function App() {
  const [active, setActive] = useState(0);
  const [sound, setSound] = useState(false);
  const [routeProgress, setRouteProgress] = useState([0, 0, 0]);
  const [completed, setCompleted] = useState([false, false, false]);
  const era = eras[active];
  const audioRef = useRef(null);
  const goToEra = (i) => { setActive(i); document.getElementById('era-explore')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); };
  const advanceRoute = (stage) => setRouteProgress((current) => current.map((value, i) => i === active ? Math.max(value, stage) : value));
  const completeRoute = () => {
    advanceRoute(3);
    setCompleted((current) => current.map((value, i) => i === active ? true : value));
  };
  const playTone = () => {
    if (!sound) return;
    try { const ctx = audioRef.current || (audioRef.current = new (window.AudioContext || window.webkitAudioContext)()); const osc = ctx.createOscillator(); const gain = ctx.createGain(); osc.type = 'sine'; osc.frequency.setValueAtTime(520, ctx.currentTime); osc.frequency.exponentialRampToValueAtTime(720, ctx.currentTime + .08); gain.gain.setValueAtTime(.025, ctx.currentTime); gain.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + .14); osc.connect(gain); gain.connect(ctx.destination); osc.start(); osc.stop(ctx.currentTime + .14); } catch { /* audio is optional */ }
  };
  useEffect(() => { if (sound) playTone(); }, [active]);
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const targets = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    targets.forEach((target) => { target.classList.add('reveal-ready'); observer.observe(target); });
    return () => observer.disconnect();
  }, []);
  return <div className="app" data-era={era.type} style={{ '--era-color': era.color, '--era-secondary': era.secondary }}><Starfield /><EpochAtmosphere key={era.type} era={era} /><Grain />
    <header className="site-header"><a href="#top" className="brand" aria-label="На главную"><span className="brand-orbit">◎</span><span>THE INTERNET<br /><b>MUSEUM</b></span></a><nav><a href="#journey">Эпохи</a><a href="#era-explore">Экспонаты</a><a href="#about">О музее</a></nav><button className="sound-btn" onClick={() => setSound(!sound)} aria-label={sound ? 'Выключить звук' : 'Включить звук'}><Icon name={sound ? 'sound' : 'mute'} size={17} /><span>ЗВУК {sound ? 'ВКЛ' : 'ВЫКЛ'}</span></button></header>
    <main id="top"><section className="hero"><div className="hero-copy"><h1>Сеть помнит<br /><em>каждый клик.</em></h1><p>В 1994-м ждали соединения. В 2003-м — ответа на форуме. В 2012-м — следующего обновления. Открой три версии интернета и посмотри, как менялись наши привычки.</p><div className="hero-actions"><a className="primary-btn" href="#journey" onClick={playTone}>Войти в архив <Icon name="arrow" /></a><span className="hero-note">03 эпохи / 03 способа быть онлайн</span></div></div><div className="hero-art" aria-label="Иллюстрация старого компьютера"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="floating-label label-bottom">SIGNAL_0{active + 1}/003</div><div className="computer"><div className="computer-shell"><div className="computer-screen"><div className="screen-glow" key={era.type}><div className="screen-top">C:\INTERNET\{era.year}.EXE <span>_ □ ×</span></div><div className="screen-inner"><div className="pixel-globe"><EraSymbol type={era.type} /></div><div className="screen-title">{era.screen}</div><div className="screen-sub">{era.screenSub}</div><div className="progress"><span /></div></div></div></div></div><div className="computer-bottom"><span className="power-light" /><span>MUSEUM {era.year}</span><span className="disk-slot" /></div><div className="computer-stand" /><div className="computer-foot" /></div><div className="art-shadow" /></div><div className="hero-index"><span>0{active + 1} / 03</span><div>{eras.map((item, i) => <i key={item.year} className={active === i ? 'current' : ''} />)}</div><span>{era.signal} ↓</span></div></section>
      <section className="intro-strip" id="journey" data-reveal><div className="strip-mark">✳</div><p>Один и тот же интернет. Три совершенно разные привычки.<br /><strong>Выбери год — и попробуй сеть того времени на ощупь.</strong></p><span>ПЕРЕКЛЮЧИ ЭПОХУ →</span></section>
      <section className="journey-section"><div className="section-heading" data-reveal><div><span className="section-kicker">01 / ВЫБОР ЧАСТОТЫ</span><h2>Настройся на <em>эпоху</em></h2></div><p>Каждая карточка — вход в другой интернет.<br />Где начнётся твой маршрут?</p></div><div className="timeline-line"><span>1990</span><span>2000</span><span>2010</span><span>СЕГОДНЯ</span></div><div className="era-grid" data-reveal>{eras.map((item, i) => <button key={item.year} className={`era-card ${active === i ? 'selected' : ''}`} onClick={() => { playTone(); goToEra(i); }} style={{ '--card-color': item.color }}><div className="era-card-top"><span>0{i + 1} / ЭПОХА</span><span className="era-card-arrow"><Icon name="arrow" size={17} /></span></div><div className="era-card-art"><span className="era-art-ring ring-a" /><span className="era-art-ring ring-b" /><span className="era-art-icon"><EraSymbol type={item.type} /></span></div><div className="era-card-content"><span>{item.tag}</span><h3>{item.year}<small>→</small></h3><p>{item.title}</p></div></button>)}</div></section>
      <section className="explore-section" id="era-explore"><div className="explore-header" data-reveal><div><span className="section-kicker">02 / ПОДКЛЮЧЕНИЕ УСТАНОВЛЕНО</span><h2>Ты в <em>{era.range}</em></h2><p>{era.subtitle}</p></div><div className="era-switch" aria-label="Переключить эпоху">{eras.map((item, i) => <button key={item.year} className={active === i ? 'active' : ''} onClick={() => { playTone(); setActive(i); }} aria-pressed={active === i}>{item.year}</button>)}</div></div><MissionPanel era={era} active={active} completed={completed} onSelectEra={setActive} /><NetworkMap era={era} stage={routeProgress[active]} /><div className="explore-grid" data-reveal><Exhibit era={era} onStage={advanceRoute} onComplete={completeRoute} done={completed[active]} /><div className="lesson-column" key={era.year}><div className="lesson-card"><span className="lesson-label">✳ &nbsp; ВНУТРИ ЭПОХИ</span><h3>{era.exhibit}</h3><p>{era.fact}</p><div className="lesson-divider" /><span className="lesson-label muted">ЧТО ИЗМЕНИЛОСЬ</span><p>{era.lesson}</p></div><div className="detail-card"><span className="lesson-label">СЛЕДЫ В СЕТИ / {era.range}</span><div className="detail-list">{era.details.map((detail) => <article className="detail-item" key={detail.year}><span>{detail.year}</span><div><h3>{detail.title}</h3><p>{detail.text}</p></div></article>)}</div></div></div></div><div className="explore-footer"><span>ТЫ НА ЧАСТОТЕ {era.year} / {era.signal}</span><button onClick={() => { playTone(); setActive((active + 1) % eras.length); }}>{active === 2 ? 'Вернуться в 1994-й' : 'Следующая эпоха'} <Icon name="arrow" /></button></div></section>
      <section className="closing" id="about" data-reveal><div className="closing-symbol">◎</div><span className="section-kicker">СИГНАЛ НЕ ПРОПАЛ</span><h2>Интерфейсы исчезают.<br /><em>Истории остаются.</em></h2><p>Когда-то мы ждали загрузки страницы, теперь ждём следующего сообщения. Путешествие по сети можно начать снова — с любого года.</p><a href="#journey" className="primary-btn">Выбрать другую эпоху <Icon name="arrow" /></a></section></main><footer><span>◎ THE INTERNET MUSEUM</span><span>ТРИ ЭПОХИ / ОДНА СЕТЬ</span><span>© 2026 · ЦИФРОВОЙ МУЗЕЙ</span></footer>
  </div>;
}

createRoot(document.getElementById('root')).render(<App />);
