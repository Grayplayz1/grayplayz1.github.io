// ===== AUTHENTICATION & ACCOUNT SYSTEM =====
const AUTH_KEY = "teamup_user";
const ACCOUNTS_KEY = "teamup_accounts";
const SITE_LANGUAGE_KEY = "teamup_site_language";
const TRANSLATION_CACHE_KEY = "teamup_translation_cache_v1";
let currentUser = null;
let currentUiLanguage = "English";

const UI_LANGUAGE_LABELS = {
  English: "English",
  Spanish: "Español",
  Portuguese: "Português",
  French: "Français",
  German: "Deutsch",
  Chinese: "中文",
  Japanese: "日本語",
  Korean: "한국어"
};

const UI_LANGUAGE_CODES = {
  English: "en",
  Spanish: "es",
  Portuguese: "pt",
  French: "fr",
  German: "de",
  Chinese: "zh-CN",
  Japanese: "ja",
  Korean: "ko"
};

const UI_I18N = {
  English: {
    language: "Language",
    browse: "Browse",
    post: "Post",
    howItWorks: "How it works",
    games: "Games",
    role: "Role",
    rank: "Rank",
    login: "Log in",
    profile: "Profile",
    logout: "Logout",
    messages: "Messages",
    requests: "Requests",
    chats: "Chats",
    incomingRequests: "Incoming requests",
    yourChats: "Your chats",
    writeMessage: "Write a message...",
    loginToMessage: "Log in to send messages",
    send: "Send",
    close: "Close",
    players: "players",
    livePlayersOnWebsite: "Live players on the website",
    playersWorldwideNow: "Players worldwide right now",
    updated: "Updated"
  },
  Spanish: {
    language: "Idioma",
    browse: "Explorar",
    post: "Publicar",
    howItWorks: "Cómo funciona",
    games: "Juegos",
    role: "Rol",
    rank: "Rango",
    login: "Iniciar sesión",
    profile: "Perfil",
    logout: "Cerrar sesión",
    messages: "Mensajes",
    requests: "Solicitudes",
    chats: "Chats",
    incomingRequests: "Solicitudes entrantes",
    yourChats: "Tus chats",
    writeMessage: "Escribe un mensaje...",
    loginToMessage: "Inicia sesión para enviar mensajes",
    send: "Enviar",
    close: "Cerrar",
    players: "jugadores",
    livePlayersOnWebsite: "Jugadores en vivo en el sitio",
    playersWorldwideNow: "Jugadores en todo el mundo ahora",
    updated: "Actualizado"
  },
  Portuguese: {
    language: "Idioma",
    browse: "Explorar",
    post: "Publicar",
    howItWorks: "Como funciona",
    games: "Jogos",
    role: "Função",
    rank: "Classificação",
    login: "Entrar",
    profile: "Perfil",
    logout: "Sair",
    messages: "Mensagens",
    requests: "Solicitações",
    chats: "Conversas",
    incomingRequests: "Solicitações recebidas",
    yourChats: "Suas conversas",
    writeMessage: "Escreva uma mensagem...",
    loginToMessage: "Entre para enviar mensagens",
    send: "Enviar",
    close: "Fechar",
    players: "jogadores",
    livePlayersOnWebsite: "Jogadores ao vivo no site",
    playersWorldwideNow: "Jogadores no mundo agora",
    updated: "Atualizado"
  },
  French: {
    language: "Langue",
    browse: "Parcourir",
    post: "Publier",
    howItWorks: "Comment ça marche",
    games: "Jeux",
    role: "Rôle",
    rank: "Rang",
    login: "Se connecter",
    profile: "Profil",
    logout: "Se déconnecter",
    messages: "Messages",
    requests: "Demandes",
    chats: "Discussions",
    incomingRequests: "Demandes reçues",
    yourChats: "Vos discussions",
    writeMessage: "Écrire un message...",
    loginToMessage: "Connectez-vous pour envoyer des messages",
    send: "Envoyer",
    close: "Fermer",
    players: "joueurs",
    livePlayersOnWebsite: "Joueurs en direct sur le site",
    playersWorldwideNow: "Joueurs dans le monde en ce moment",
    updated: "Mis à jour"
  },
  German: {
    language: "Sprache",
    browse: "Durchsuchen",
    post: "Posten",
    howItWorks: "So funktioniert's",
    games: "Spiele",
    role: "Rolle",
    rank: "Rang",
    login: "Anmelden",
    profile: "Profil",
    logout: "Abmelden",
    messages: "Nachrichten",
    requests: "Anfragen",
    chats: "Chats",
    incomingRequests: "Eingehende Anfragen",
    yourChats: "Deine Chats",
    writeMessage: "Nachricht schreiben...",
    loginToMessage: "Melde dich an, um Nachrichten zu senden",
    send: "Senden",
    close: "Schließen",
    players: "Spieler",
    livePlayersOnWebsite: "Live-Spieler auf der Website",
    playersWorldwideNow: "Spieler weltweit gerade jetzt",
    updated: "Aktualisiert"
  },
  Chinese: {
    language: "语言",
    browse: "浏览",
    post: "发布",
    howItWorks: "使用说明",
    games: "游戏",
    role: "定位",
    rank: "段位",
    login: "登录",
    profile: "个人资料",
    logout: "退出登录",
    messages: "消息",
    requests: "请求",
    chats: "聊天",
    incomingRequests: "收到的请求",
    yourChats: "你的聊天",
    writeMessage: "输入消息...",
    loginToMessage: "登录后才能发送消息",
    send: "发送",
    close: "关闭",
    players: "玩家",
    livePlayersOnWebsite: "网站在线玩家",
    playersWorldwideNow: "当前全球玩家",
    updated: "已更新"
  },
  Japanese: {
    language: "言語",
    browse: "閲覧",
    post: "投稿",
    howItWorks: "使い方",
    games: "ゲーム",
    role: "ロール",
    rank: "ランク",
    login: "ログイン",
    profile: "プロフィール",
    logout: "ログアウト",
    messages: "メッセージ",
    requests: "リクエスト",
    chats: "チャット",
    incomingRequests: "受信リクエスト",
    yourChats: "あなたのチャット",
    writeMessage: "メッセージを入力...",
    loginToMessage: "メッセージ送信にはログインが必要です",
    send: "送信",
    close: "閉じる",
    players: "人",
    livePlayersOnWebsite: "サイト内の現在プレイヤー",
    playersWorldwideNow: "現在の世界中のプレイヤー",
    updated: "更新"
  },
  Korean: {
    language: "언어",
    browse: "찾아보기",
    post: "게시",
    howItWorks: "이용 방법",
    games: "게임",
    role: "역할",
    rank: "랭크",
    login: "로그인",
    profile: "프로필",
    logout: "로그아웃",
    messages: "메시지",
    requests: "요청",
    chats: "채팅",
    incomingRequests: "받은 요청",
    yourChats: "내 채팅",
    writeMessage: "메시지 입력...",
    loginToMessage: "메시지를 보내려면 로그인하세요",
    send: "보내기",
    close: "닫기",
    players: "명",
    livePlayersOnWebsite: "사이트 실시간 플레이어",
    playersWorldwideNow: "현재 전 세계 플레이어",
    updated: "업데이트"
  }
};

const UI_PHRASE_TRANSLATIONS = {
  "Find squad members for Roblox, Valorant, Minecraft, Fortnite and more.": {
    Spanish: "Encuentra compañeros para Roblox, Valorant, Minecraft, Fortnite y más.",
    Portuguese: "Encontre companheiros para Roblox, Valorant, Minecraft, Fortnite e mais.",
    French: "Trouvez des coéquipiers pour Roblox, Valorant, Minecraft, Fortnite et plus.",
    German: "Finde Mitspieler für Roblox, Valorant, Minecraft, Fortnite und mehr.",
    Chinese: "为 Roblox、Valorant、Minecraft、Fortnite 等游戏寻找队友。",
    Japanese: "Roblox、Valorant、Minecraft、Fortnite などの仲間を見つけよう。",
    Korean: "Roblox, Valorant, Minecraft, Fortnite 등에서 함께할 팀원을 찾으세요."
  },
  "One place for all your squads": {
    Spanish: "Un solo lugar para todos tus equipos",
    Portuguese: "Um só lugar para todos os seus esquadrões",
    French: "Un seul endroit pour toutes vos équipes",
    German: "Ein Ort für all deine Teams",
    Chinese: "你的所有小队，一站搞定",
    Japanese: "すべてのチーム募集を一か所で",
    Korean: "모든 스쿼드를 한곳에서"
  },
  "Stop switching servers. Find teammates fast across games.": {
    Spanish: "Deja de cambiar de servidor. Encuentra compañeros rápido en todos los juegos.",
    Portuguese: "Pare de trocar de servidor. Encontre companheiros rapidamente em vários jogos.",
    French: "Arrêtez de changer de serveur. Trouvez rapidement des coéquipiers selon les jeux.",
    German: "Hör auf, zwischen Servern zu wechseln. Finde schnell Mitspieler für verschiedene Spiele.",
    Chinese: "不用再反复换服务器，跨游戏快速找队友。",
    Japanese: "サーバーを渡り歩くのはもう終わり。ゲームをまたいで素早く仲間探し。",
    Korean: "서버를 옮겨 다니지 말고, 여러 게임에서 빠르게 팀원을 찾으세요."
  },
  "Browse live group requests, post your own game session, and connect with players for Roblox, Valorant, Minecraft, Fortnite, Apex Legends, and more.": {
    Spanish: "Explora solicitudes activas, publica tu sesión y conecta con jugadores de Roblox, Valorant, Minecraft, Fortnite, Apex Legends y más.",
    Portuguese: "Veja pedidos ao vivo, publique sua sessão e conecte-se com jogadores de Roblox, Valorant, Minecraft, Fortnite, Apex Legends e mais.",
    French: "Parcourez les demandes en direct, publiez votre session et connectez-vous avec des joueurs de Roblox, Valorant, Minecraft, Fortnite, Apex Legends et plus.",
    German: "Durchsuche Live-Anfragen, poste deine Session und vernetze dich mit Spielern aus Roblox, Valorant, Minecraft, Fortnite, Apex Legends und mehr.",
    Chinese: "浏览实时组队请求，发布你的游戏局，与 Roblox、Valorant、Minecraft、Fortnite、Apex Legends 等玩家连接。",
    Japanese: "リアルタイム募集を見て、自分のセッションを投稿し、Roblox・Valorant・Minecraft・Fortnite・Apex Legends などのプレイヤーとつながろう。",
    Korean: "실시간 팀 모집을 둘러보고, 내 게임 세션을 올리고, Roblox, Valorant, Minecraft, Fortnite, Apex Legends 등 플레이어와 연결하세요."
  },
  "Browse Posts": {
    Spanish: "Ver publicaciones",
    Portuguese: "Ver postagens",
    French: "Voir les annonces",
    German: "Beiträge ansehen",
    Chinese: "浏览帖子",
    Japanese: "投稿を見る",
    Korean: "게시글 보기"
  },
  "Players online (live)": {
    Spanish: "Jugadores en línea (en vivo)",
    Portuguese: "Jogadores online (ao vivo)",
    French: "Joueurs en ligne (en direct)",
    German: "Spieler online (live)",
    Chinese: "在线玩家（实时）",
    Japanese: "オンラインプレイヤー（ライブ）",
    Korean: "온라인 플레이어 (실시간)"
  },
  "Quick view of how many players are active per game. Click a game to filter posts.": {
    Spanish: "Vista rápida de cuántos jugadores hay por juego. Haz clic en un juego para filtrar publicaciones.",
    Portuguese: "Visão rápida de quantos jogadores estão ativos por jogo. Clique em um jogo para filtrar postagens.",
    French: "Aperçu rapide du nombre de joueurs actifs par jeu. Cliquez sur un jeu pour filtrer les annonces.",
    German: "Schnellüberblick über aktive Spieler pro Spiel. Klicke auf ein Spiel, um Beiträge zu filtern.",
    Chinese: "快速查看每个游戏的活跃玩家数量。点击游戏可筛选帖子。",
    Japanese: "ゲームごとのアクティブ人数をすばやく確認。ゲームをクリックして投稿を絞り込み。",
    Korean: "게임별 활성 플레이어 수를 빠르게 확인하세요. 게임을 클릭해 게시글을 필터링할 수 있습니다."
  },
  "Browse current posts": {
    Spanish: "Explorar publicaciones actuales",
    Portuguese: "Explorar postagens atuais",
    French: "Parcourir les annonces actuelles",
    German: "Aktuelle Beiträge durchsuchen",
    Chinese: "浏览当前帖子",
    Japanese: "現在の投稿を閲覧",
    Korean: "현재 게시글 둘러보기"
  },
  "Filter by the game you want to play and join a session instantly.": {
    Spanish: "Filtra por el juego que quieras y únete al instante.",
    Portuguese: "Filtre pelo jogo que você quer jogar e entre na sessão na hora.",
    French: "Filtrez selon le jeu souhaité et rejoignez une session immédiatement.",
    German: "Filtere nach dem Spiel, das du spielen willst, und tritt sofort bei.",
    Chinese: "按想玩的游戏筛选，立即加入对局。",
    Japanese: "遊びたいゲームで絞り込み、すぐに参加。",
    Korean: "원하는 게임으로 필터링하고 바로 세션에 참여하세요."
  },
  "Tell us about yourself": {
    Spanish: "Cuéntanos sobre ti",
    Portuguese: "Conte sobre você",
    French: "Parlez-nous de vous",
    German: "Erzähl uns etwas über dich",
    Chinese: "介绍一下你自己",
    Japanese: "あなたについて教えてください",
    Korean: "자기소개를 해주세요"
  },
  "Fill out as much as you want to help us find the right teammates for you.": {
    Spanish: "Completa lo que quieras para ayudarte a encontrar compañeros ideales.",
    Portuguese: "Preencha o quanto quiser para encontrarmos os companheiros certos para você.",
    French: "Remplissez ce que vous voulez pour nous aider à trouver les bons coéquipiers.",
    German: "Fülle so viel aus, wie du möchtest, damit wir passende Mitspieler finden.",
    Chinese: "尽可能填写信息，帮助我们为你匹配合适的队友。",
    Japanese: "可能な範囲で入力して、最適な仲間探しに役立てましょう。",
    Korean: "원하는 만큼 입력하면 더 잘 맞는 팀원을 찾는 데 도움이 됩니다."
  },
  "Personal": { Spanish: "Personal", Portuguese: "Pessoal", French: "Personnel", German: "Persönlich", Chinese: "个人信息", Japanese: "個人", Korean: "개인" },
  "Age from": { Spanish: "Edad desde", Portuguese: "Idade de", French: "Âge de", German: "Alter von", Chinese: "年龄从", Japanese: "年齢（下限）", Korean: "최소 나이" },
  "Age to": { Spanish: "Edad hasta", Portuguese: "Idade até", French: "Âge à", German: "Alter bis", Chinese: "年龄到", Japanese: "年齢（上限）", Korean: "최대 나이" },
  "Location": { Spanish: "Ubicación", Portuguese: "Localização", French: "Localisation", German: "Standort", Chinese: "地区", Japanese: "地域", Korean: "지역" },
  "Communication": { Spanish: "Comunicación", Portuguese: "Comunicação", French: "Communication", German: "Kommunikation", Chinese: "沟通", Japanese: "コミュニケーション", Korean: "의사소통" },
  "Must have a microphone and be willing to communicate.": {
    Spanish: "Debe tener micrófono y disposición para comunicarse.",
    Portuguese: "Deve ter microfone e vontade de se comunicar.",
    French: "Doit avoir un micro et être prêt à communiquer.",
    German: "Muss ein Mikrofon haben und kommunikationsbereit sein.",
    Chinese: "需要有麦克风并愿意交流。",
    Japanese: "マイク所持＆会話できる方。",
    Korean: "마이크 사용 가능하고 소통 가능한 분."
  },
  "Time available": { Spanish: "Disponibilidad", Portuguese: "Tempo disponível", French: "Disponibilité", German: "Verfügbare Zeit", Chinese: "可用时间", Japanese: "参加可能時間", Korean: "가능 시간" },
  "Back": { Spanish: "Atrás", Portuguese: "Voltar", French: "Retour", German: "Zurück", Chinese: "返回", Japanese: "戻る", Korean: "뒤로" },
  "Save": { Spanish: "Guardar", Portuguese: "Salvar", French: "Enregistrer", German: "Speichern", Chinese: "保存", Japanese: "保存", Korean: "저장" },
  "Post your own teamup request!": {
    Spanish: "¡Publica tu propia solicitud de equipo!",
    Portuguese: "Publique seu próprio pedido de equipe!",
    French: "Publiez votre propre demande d'équipe !",
    German: "Erstelle deine eigene Team-Anfrage!",
    Chinese: "发布你自己的组队请求！",
    Japanese: "自分のチーム募集を投稿しよう！",
    Korean: "직접 팀업 모집글을 올려보세요!"
  },
  "Reach other players without needing Discord or multiple communities.": {
    Spanish: "Llega a otros jugadores sin depender de Discord ni múltiples comunidades.",
    Portuguese: "Alcance outros jogadores sem precisar de Discord ou várias comunidades.",
    French: "Trouvez d'autres joueurs sans Discord ni plusieurs communautés.",
    German: "Erreiche andere Spieler ohne Discord oder mehrere Communities.",
    Chinese: "无需 Discord 或多个社区，也能找到玩家。",
    Japanese: "Discord や複数コミュニティなしでプレイヤーに届く。",
    Korean: "Discord나 여러 커뮤니티 없이도 다른 플레이어를 찾을 수 있습니다."
  },
  "Game": { Spanish: "Juego", Portuguese: "Jogo", French: "Jeu", German: "Spiel", Chinese: "游戏", Japanese: "ゲーム", Korean: "게임" },
  "Your name": { Spanish: "Tu nombre", Portuguese: "Seu nome", French: "Votre nom", German: "Dein Name", Chinese: "你的名字", Japanese: "あなたの名前", Korean: "이름" },
  "Username or handle": { Spanish: "Usuario o apodo", Portuguese: "Usuário ou apelido", French: "Nom d'utilisateur ou pseudo", German: "Benutzername oder Alias", Chinese: "用户名或昵称", Japanese: "ユーザー名またはハンドル", Korean: "사용자 이름 또는 닉네임" },
  "Role / Goal": { Spanish: "Rol / Objetivo", Portuguese: "Função / Objetivo", French: "Rôle / Objectif", German: "Rolle / Ziel", Chinese: "定位 / 目标", Japanese: "ロール / 目的", Korean: "역할 / 목표" },
  "Age": { Spanish: "Edad", Portuguese: "Idade", French: "Âge", German: "Alter", Chinese: "年龄", Japanese: "年齢", Korean: "나이" },
  "Platform / Server": { Spanish: "Plataforma / Servidor", Portuguese: "Plataforma / Servidor", French: "Plateforme / Serveur", German: "Plattform / Server", Chinese: "平台 / 服务器", Japanese: "プラットフォーム / サーバー", Korean: "플랫폼 / 서버" },
  "Server": { Spanish: "Servidor", Portuguese: "Servidor", French: "Serveur", German: "Server", Chinese: "服务器", Japanese: "サーバー", Korean: "서버" },
  "Game Mode": { Spanish: "Modo de juego", Portuguese: "Modo de jogo", French: "Mode de jeu", German: "Spielmodus", Chinese: "游戏模式", Japanese: "ゲームモード", Korean: "게임 모드" },
  "Description": { Spanish: "Descripción", Portuguese: "Descrição", French: "Description", German: "Beschreibung", Chinese: "描述", Japanese: "説明", Korean: "설명" },
  "What are you looking for?": { Spanish: "¿Qué estás buscando?", Portuguese: "O que você procura?", French: "Que recherchez-vous ?", German: "Wonach suchst du?", Chinese: "你在找什么？", Japanese: "何を探していますか？", Korean: "무엇을 찾고 있나요?" },
  "Post Listing": { Spanish: "Publicar", Portuguese: "Publicar", French: "Publier", German: "Posten", Chinese: "发布", Japanese: "投稿", Korean: "게시" },
  "Clear saved posts": { Spanish: "Borrar publicaciones guardadas", Portuguese: "Limpar postagens salvas", French: "Effacer les annonces enregistrées", German: "Gespeicherte Beiträge löschen", Chinese: "清除已保存帖子", Japanese: "保存済み投稿を削除", Korean: "저장된 게시글 삭제" },
  "Login to Teamup.gg": { Spanish: "Inicia sesión en Teamup.gg", Portuguese: "Entrar no Teamup.gg", French: "Connexion à Teamup.gg", German: "Bei Teamup.gg anmelden", Chinese: "登录 Teamup.gg", Japanese: "Teamup.gg にログイン", Korean: "Teamup.gg 로그인" },
  "Email": { Spanish: "Correo", Portuguese: "Email", French: "E-mail", German: "E-Mail", Chinese: "邮箱", Japanese: "メール", Korean: "이메일" },
  "Password": { Spanish: "Contraseña", Portuguese: "Senha", French: "Mot de passe", German: "Passwort", Chinese: "密码", Japanese: "パスワード", Korean: "비밀번호" },
  "Login": { Spanish: "Iniciar sesión", Portuguese: "Entrar", French: "Connexion", German: "Anmelden", Chinese: "登录", Japanese: "ログイン", Korean: "로그인" },
  "Don't have an account?": { Spanish: "¿No tienes cuenta?", Portuguese: "Não tem conta?", French: "Vous n'avez pas de compte ?", German: "Kein Konto?", Chinese: "还没有账号？", Japanese: "アカウントをお持ちでないですか？", Korean: "계정이 없나요?" },
  "Sign up": { Spanish: "Registrarse", Portuguese: "Cadastrar", French: "S'inscrire", German: "Registrieren", Chinese: "注册", Japanese: "新規登録", Korean: "회원가입" },
  "Create Account": { Spanish: "Crear cuenta", Portuguese: "Criar conta", French: "Créer un compte", German: "Konto erstellen", Chinese: "创建账号", Japanese: "アカウント作成", Korean: "계정 만들기" },
  "Confirm password": { Spanish: "Confirmar contraseña", Portuguese: "Confirmar senha", French: "Confirmer le mot de passe", German: "Passwort bestätigen", Chinese: "确认密码", Japanese: "パスワード確認", Korean: "비밀번호 확인" },
  "Optional gamer handles": { Spanish: "Alias de jugador opcionales", Portuguese: "Nomes de jogador opcionais", French: "Pseudos de joueur facultatifs", German: "Optionale Gamer-Namen", Chinese: "可选游戏昵称", Japanese: "任意のゲーム名", Korean: "선택 게이머 핸들" },
  "PSN name (optional)": { Spanish: "Nombre de PSN (opcional)", Portuguese: "Nome da PSN (opcional)", French: "Nom PSN (optionnel)", German: "PSN-Name (optional)", Chinese: "PSN 名称（可选）", Japanese: "PSN名（任意）", Korean: "PSN 이름 (선택)" },
  "Xbox name (optional)": { Spanish: "Nombre de Xbox (opcional)", Portuguese: "Nome do Xbox (opcional)", French: "Nom Xbox (optionnel)", German: "Xbox-Name (optional)", Chinese: "Xbox 名称（可选）", Japanese: "Xbox名（任意）", Korean: "Xbox 이름 (선택)" },
  "Nintendo name (optional)": { Spanish: "Nombre de Nintendo (opcional)", Portuguese: "Nome da Nintendo (opcional)", French: "Nom Nintendo (optionnel)", German: "Nintendo-Name (optional)", Chinese: "Nintendo 名称（可选）", Japanese: "Nintendo名（任意）", Korean: "Nintendo 이름 (선택)" },
  "Discord account (optional)": { Spanish: "Cuenta de Discord (opcional)", Portuguese: "Conta do Discord (opcional)", French: "Compte Discord (optionnel)", German: "Discord-Konto (optional)", Chinese: "Discord 账号（可选）", Japanese: "Discordアカウント（任意）", Korean: "Discord 계정 (선택)" },
  "Skip": { Spanish: "Omitir", Portuguese: "Pular", French: "Passer", German: "Überspringen", Chinese: "跳过", Japanese: "スキップ", Korean: "건너뛰기" },
  "Already have an account?": { Spanish: "¿Ya tienes cuenta?", Portuguese: "Já tem conta?", French: "Vous avez déjà un compte ?", German: "Schon ein Konto?", Chinese: "已有账号？", Japanese: "すでにアカウントをお持ちですか？", Korean: "이미 계정이 있나요?" },
  "Choose your display name and avatar": { Spanish: "Elige tu nombre y avatar", Portuguese: "Escolha seu nome e avatar", French: "Choisissez votre pseudo et avatar", German: "Wähle deinen Anzeigenamen und Avatar", Chinese: "选择你的显示名称和头像", Japanese: "表示名とアバターを選択", Korean: "표시 이름과 아바타 선택" },
  "Display name (e.g., DragonSlayer)": { Spanish: "Nombre visible (ej., DragonSlayer)", Portuguese: "Nome de exibição (ex.: DragonSlayer)", French: "Nom affiché (ex. : DragonSlayer)", German: "Anzeigename (z. B. DragonSlayer)", Chinese: "显示名称（例如 DragonSlayer）", Japanese: "表示名（例: DragonSlayer）", Korean: "표시 이름 (예: DragonSlayer)" },
  "Continue": { Spanish: "Continuar", Portuguese: "Continuar", French: "Continuer", German: "Weiter", Chinese: "继续", Japanese: "続ける", Korean: "계속" },
  "Incoming requests": { Spanish: "Solicitudes entrantes", Portuguese: "Solicitações recebidas", French: "Demandes reçues", German: "Eingehende Anfragen", Chinese: "收到的请求", Japanese: "受信リクエスト", Korean: "받은 요청" },
  "Your chats": { Spanish: "Tus chats", Portuguese: "Suas conversas", French: "Vos discussions", German: "Deine Chats", Chinese: "你的聊天", Japanese: "あなたのチャット", Korean: "내 채팅" },
  "1v1": { Spanish: "1v1", Portuguese: "1v1", French: "1v1", German: "1v1", Chinese: "1v1", Japanese: "1v1", Korean: "1v1" },
  "No matches yet": { Spanish: "Sin coincidencias", Portuguese: "Sem resultados", French: "Aucun résultat", German: "Noch keine Treffer", Chinese: "暂无匹配", Japanese: "一致する結果がありません", Korean: "일치하는 결과 없음" },
  "Try another game or post your own session to get started.": {
    Spanish: "Prueba otro juego o publica tu sesión para empezar.",
    Portuguese: "Tente outro jogo ou publique sua sessão para começar.",
    French: "Essayez un autre jeu ou publiez votre session pour commencer.",
    German: "Probiere ein anderes Spiel oder poste deine eigene Session.",
    Chinese: "试试其他游戏，或发布你的会话开始吧。",
    Japanese: "別のゲームを試すか、自分のセッションを投稿して始めましょう。",
    Korean: "다른 게임을 시도하거나 직접 세션을 게시해 시작하세요."
  },
  "Accept": { Spanish: "Aceptar", Portuguese: "Aceitar", French: "Accepter", German: "Annehmen", Chinese: "接受", Japanese: "承認", Korean: "수락" },
  "Decline": { Spanish: "拒否", Portuguese: "Recusar", French: "Refuser", German: "Ablehnen", Chinese: "拒绝", Japanese: "辞退", Korean: "거절" },
  "Block": { Spanish: "Bloquear", Portuguese: "Bloquear", French: "Bloquer", German: "Blockieren", Chinese: "拉黑", Japanese: "ブロック", Korean: "차단" },
  "Open": { Spanish: "Abrir", Portuguese: "Abrir", French: "Ouvrir", German: "Öffnen", Chinese: "打开", Japanese: "開く", Korean: "열기" },
  "Delete": { Spanish: "Eliminar", Portuguese: "Excluir", French: "Supprimer", German: "Löschen", Chinese: "删除", Japanese: "削除", Korean: "삭제" },
  "Status": { Spanish: "Estado", Portuguese: "Status", French: "Statut", German: "Status", Chinese: "状态", Japanese: "状態", Korean: "상태" },
  "Message flagged for inappropriate content": {
    Spanish: "Mensaje marcado por contenido inapropiado",
    Portuguese: "Mensagem sinalizada por conteúdo impróprio",
    French: "Message signalé pour contenu inapproprié",
    German: "Nachricht wegen unangemessenem Inhalt markiert",
    Chinese: "消息因不当内容被标记",
    Japanese: "不適切な内容としてメッセージが検出されました",
    Korean: "메시지가 부적절한 내용으로 표시되었습니다"
  },
  "All games": { Spanish: "Todos los juegos", Portuguese: "Todos os jogos", French: "Tous les jeux", German: "Alle Spiele", Chinese: "全部游戏", Japanese: "すべてのゲーム", Korean: "모든 게임" },
  "All roles": { Spanish: "Todos los roles", Portuguese: "Todas as funções", French: "Tous les rôles", German: "Alle Rollen", Chinese: "全部定位", Japanese: "すべてのロール", Korean: "모든 역할" },
  "All ranks": { Spanish: "Todos los rangos", Portuguese: "Todas as classificações", French: "Tous les rangs", German: "Alle Ränge", Chinese: "全部段位", Japanese: "すべてのランク", Korean: "모든 랭크" },
  "All regions": { Spanish: "Todas las regiones", Portuguese: "Todas as regiões", French: "Toutes les régions", German: "Alle Regionen", Chinese: "全部地区", Japanese: "全地域", Korean: "모든 지역" },
  "Select a game": { Spanish: "Selecciona un juego", Portuguese: "Selecione um jogo", French: "Sélectionnez un jeu", German: "Spiel auswählen", Chinese: "选择游戏", Japanese: "ゲームを選択", Korean: "게임 선택" },
  "Select age": { Spanish: "Selecciona edad", Portuguese: "Selecione idade", French: "Sélectionnez l'âge", German: "Alter auswählen", Chinese: "选择年龄", Japanese: "年齢を選択", Korean: "나이 선택" },
  "Select timezone": { Spanish: "Selecciona zona horaria", Portuguese: "Selecione fuso horário", French: "Sélectionnez le fuseau horaire", German: "Zeitzone auswählen", Chinese: "选择时区", Japanese: "タイムゾーンを選択", Korean: "시간대 선택" },
  "Select a server": { Spanish: "Selecciona un servidor", Portuguese: "Selecione um servidor", French: "Sélectionnez un serveur", German: "Server auswählen", Chinese: "选择服务器", Japanese: "サーバーを選択", Korean: "서버 선택" },
  "Select game mode": { Spanish: "Selecciona modo de juego", Portuguese: "Selecione modo de jogo", French: "Sélectionnez le mode de jeu", German: "Spielmodus auswählen", Chinese: "选择游戏模式", Japanese: "ゲームモードを選択", Korean: "게임 모드 선택" },
  "Close messages": { Spanish: "Cerrar mensajes", Portuguese: "Fechar mensagens", French: "Fermer les messages", German: "Nachrichten schließen", Chinese: "关闭消息", Japanese: "メッセージを閉じる", Korean: "메시지 닫기" },
  "Players online by game": { Spanish: "Jugadores en línea por juego", Portuguese: "Jogadores online por jogo", French: "Joueurs en ligne par jeu", German: "Online-Spieler nach Spiel", Chinese: "按游戏分类的在线玩家", Japanese: "ゲーム別オンラインプレイヤー", Korean: "게임별 온라인 플레이어" },
  "Server region filters": { Spanish: "Filtros por región", Portuguese: "Filtros de região", French: "Filtres de région", German: "Regionsfilter", Chinese: "服务器地区筛选", Japanese: "地域フィルター", Korean: "서버 지역 필터" },
  "No rank": { Spanish: "Sin rango", Portuguese: "Sem classificação", French: "Sans rang", German: "Kein Rang", Chinese: "无段位", Japanese: "ランクなし", Korean: "랭크 없음" },
  "No rank (casual)": { Spanish: "Sin rango (casual)", Portuguese: "Sem classificação (casual)", French: "Sans rang (casual)", German: "Kein Rang (casual)", Chinese: "无段位（休闲）", Japanese: "ランクなし（カジュアル）", Korean: "랭크 없음 (캐주얼)" },
  "--- Ranks by game ---": { Spanish: "--- Rangos por juego ---", Portuguese: "--- Classificações por jogo ---", French: "--- Rangs par jeu ---", German: "--- Ränge nach Spiel ---", Chinese: "--- 按游戏分类的段位 ---", Japanese: "--- ゲーム別ランク ---", Korean: "--- 게임별 랭크 ---" },
  "Featured game characters": { Spanish: "Personajes destacados", Portuguese: "Personagens em destaque", French: "Personnages en vedette", German: "Vorgestellte Charaktere", Chinese: "精选游戏角色", Japanese: "注目のキャラクター", Korean: "추천 캐릭터" },
  "Any": { Spanish: "Cualquiera", Portuguese: "Qualquer", French: "N'importe lequel", German: "Beliebig", Chinese: "任意", Japanese: "任意", Korean: "아무거나" },
  "Support": { Spanish: "Soporte", Portuguese: "Suporte", French: "Support", German: "Support", Chinese: "辅助", Japanese: "サポート", Korean: "서포트" },
  "Tank": { Spanish: "Tanque", Portuguese: "Tanque", French: "Tank", German: "Tank", Chinese: "坦克", Japanese: "タンク", Korean: "탱커" },
  "Builder": { Spanish: "Constructor", Portuguese: "Construtor", French: "Bâtisseur", German: "Bauer", Chinese: "建造者", Japanese: "ビルダー", Korean: "빌더" },
  "Chat": { Spanish: "Chat", Portuguese: "Chat", French: "Chat", German: "Chat", Chinese: "聊天", Japanese: "チャット", Korean: "채팅" },
  "Profile": { Spanish: "Perfil", Portuguese: "Perfil", French: "Profil", German: "Profil", Chinese: "资料", Japanese: "プロフィール", Korean: "프로필" },
  "Rank": { Spanish: "Rango", Portuguese: "Classificação", French: "Rang", German: "Rang", Chinese: "段位", Japanese: "ランク", Korean: "랭크" },
  "North America East": { Spanish: "Norteamérica Este", Portuguese: "América do Norte Leste", French: "Amérique du Nord Est", German: "Nordamerika Ost", Chinese: "北美东部", Japanese: "北米東部", Korean: "북미 동부" },
  "North America West": { Spanish: "Norteamérica Oeste", Portuguese: "América do Norte Oeste", French: "Amérique du Nord Ouest", German: "Nordamerika West", Chinese: "北美西部", Japanese: "北米西部", Korean: "북미 서부" },
  "South America": { Spanish: "Sudamérica", Portuguese: "América do Sul", French: "Amérique du Sud", German: "Südamerika", Chinese: "南美", Japanese: "南米", Korean: "남미" },
  "Asia": { Spanish: "Asia", Portuguese: "Ásia", French: "Asie", German: "Asien", Chinese: "亚洲", Japanese: "アジア", Korean: "아시아" },
  "Oceania": { Spanish: "Oceanía", Portuguese: "Oceania", French: "Océanie", German: "Ozeanien", Chinese: "大洋洲", Japanese: "オセアニア", Korean: "오세아니아" },
  "Africa": { Spanish: "África", Portuguese: "África", French: "Afrique", German: "Afrika", Chinese: "非洲", Japanese: "アフリカ", Korean: "아프리카" },
  "Middle East": { Spanish: "Medio Oriente", Portuguese: "Oriente Médio", French: "Moyen-Orient", German: "Naher Osten", Chinese: "中东", Japanese: "中東", Korean: "중동" }
};

const ORIGINAL_TEXT_NODE_MAP = new WeakMap();
const translationRequestCache = new Map();
let deepTranslationDebounceTimer = null;
let translationCache = {};

function loadTranslationCache() {
  try {
    const stored = localStorage.getItem(TRANSLATION_CACHE_KEY);
    if (!stored) return {};
    const parsed = JSON.parse(stored);
    if (parsed && typeof parsed === "object") return parsed;
    return {};
  } catch (error) {
    return {};
  }
}

function saveTranslationCache() {
  try {
    localStorage.setItem(TRANSLATION_CACHE_KEY, JSON.stringify(translationCache));
  } catch (error) {
    // Ignore storage errors.
  }
}

function getCachedAutoTranslation(language, source) {
  const langCache = translationCache[language];
  if (!langCache) return null;
  return langCache[source] || null;
}

function setCachedAutoTranslation(language, source, translated) {
  if (!translationCache[language]) translationCache[language] = {};
  translationCache[language][source] = translated;
}

async function fetchAutoTranslation(source, targetLanguage) {
  const sourceText = String(source || "").trim();
  if (!sourceText) return sourceText;

  const sourceCode = "en";
  const targetCode = UI_LANGUAGE_CODES[targetLanguage] || "en";
  if (targetCode === "en") return sourceText;

  const cacheKey = `${targetLanguage}::${sourceText}`;
  if (translationRequestCache.has(cacheKey)) {
    return translationRequestCache.get(cacheKey);
  }

  const cached = getCachedAutoTranslation(targetLanguage, sourceText);
  if (cached) return cached;

  const requestPromise = (async () => {
    try {
      const endpoint = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(sourceText)}&langpair=${sourceCode}|${targetCode}`;
      const response = await fetch(endpoint);
      if (!response.ok) return sourceText;
      const payload = await response.json();
      const translated = payload && payload.responseData && payload.responseData.translatedText
        ? String(payload.responseData.translatedText).trim()
        : sourceText;
      if (translated) {
        setCachedAutoTranslation(targetLanguage, sourceText, translated);
        saveTranslationCache();
      }
      return translated || sourceText;
    } catch (error) {
      return sourceText;
    } finally {
      translationRequestCache.delete(cacheKey);
    }
  })();

  translationRequestCache.set(cacheKey, requestPromise);
  return requestPromise;
}

function translatePhrase(text) {
  const source = String(text || "");
  const lang = normalizeUiLanguageName(currentUiLanguage);
  if (lang === "English") return source;
  const translated = UI_PHRASE_TRANSLATIONS[source] && UI_PHRASE_TRANSLATIONS[source][lang];
  return translated || source;
}

async function translatePhraseAny(text) {
  const source = String(text || "");
  const lang = normalizeUiLanguageName(currentUiLanguage);
  if (lang === "English") return source;

  const mapped = translatePhrase(source);
  if (mapped !== source) return mapped;

  // Local file pages often block/slow cross-origin translation APIs.
  if (window.location.protocol === "file:") {
    return source;
  }

  const cached = getCachedAutoTranslation(lang, source);
  if (cached) return cached;

  return fetchAutoTranslation(source, lang);
}

function replaceNodeText(node, translatedCore) {
  const original = ORIGINAL_TEXT_NODE_MAP.get(node) || node.textContent;
  const match = original.match(/^(\s*)([\s\S]*?)(\s*)$/);
  if (!match) {
    node.textContent = translatedCore;
    return;
  }
  node.textContent = `${match[1]}${translatedCore}${match[3]}`;
}

async function applyDeepPageTranslation() {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.parentElement) return NodeFilter.FILTER_REJECT;
      const tag = node.parentElement.tagName;
      if (tag === "SCRIPT" || tag === "STYLE" || tag === "NOSCRIPT") return NodeFilter.FILTER_REJECT;
      if (!node.textContent || !node.textContent.trim()) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  });

  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (!ORIGINAL_TEXT_NODE_MAP.has(node)) {
      ORIGINAL_TEXT_NODE_MAP.set(node, node.textContent);
    }
    const original = ORIGINAL_TEXT_NODE_MAP.get(node);
    const core = original.trim();
    const translated = await translatePhraseAny(core);
    replaceNodeText(node, translated);
  }

  const placeholderNodes = Array.from(document.querySelectorAll("[placeholder]"));
  for (const el of placeholderNodes) {
    if (!el.dataset.i18nOriginalPlaceholder) {
      el.dataset.i18nOriginalPlaceholder = el.getAttribute("placeholder") || "";
    }
    const translated = await translatePhraseAny(el.dataset.i18nOriginalPlaceholder);
    el.setAttribute("placeholder", translated);
  }

  const titleNodes = Array.from(document.querySelectorAll("[title]"));
  for (const el of titleNodes) {
    if (!el.dataset.i18nOriginalTitle) {
      el.dataset.i18nOriginalTitle = el.getAttribute("title") || "";
    }
    const translated = await translatePhraseAny(el.dataset.i18nOriginalTitle);
    el.setAttribute("title", translated);
  }

  const ariaNodes = Array.from(document.querySelectorAll("[aria-label]"));
  for (const el of ariaNodes) {
    if (!el.dataset.i18nOriginalAriaLabel) {
      el.dataset.i18nOriginalAriaLabel = el.getAttribute("aria-label") || "";
    }
    const translated = await translatePhraseAny(el.dataset.i18nOriginalAriaLabel);
    el.setAttribute("aria-label", translated);
  }

  const optionNodes = Array.from(document.querySelectorAll("option"));
  for (const option of optionNodes) {
    if (!option.dataset.i18nOriginalText) {
      option.dataset.i18nOriginalText = option.textContent || "";
    }
    option.textContent = await translatePhraseAny(option.dataset.i18nOriginalText);
  }
}

function scheduleDeepPageTranslation() {
  if (deepTranslationDebounceTimer) {
    clearTimeout(deepTranslationDebounceTimer);
  }
  deepTranslationDebounceTimer = setTimeout(() => {
    applyDeepPageTranslation().catch(() => {
      // Do not break UX if translation fails.
    });
  }, 60);
}

function normalizeUiLanguageName(language) {
  const normalized = String(language || "").trim();
  if (UI_I18N[normalized]) return normalized;
  return "English";
}

function tUi(key) {
  const lang = normalizeUiLanguageName(currentUiLanguage);
  return (UI_I18N[lang] && UI_I18N[lang][key]) || UI_I18N.English[key] || key;
}

function getPreferredUiLanguage() {
  const fromStorage = localStorage.getItem(SITE_LANGUAGE_KEY);
  if (fromStorage) return normalizeUiLanguageName(fromStorage);
  if (currentUser && currentUser.language) return normalizeUiLanguageName(currentUser.language);
  return "English";
}

function loadUser() {
  const s = localStorage.getItem(AUTH_KEY);
  if (s) {
    try { currentUser = JSON.parse(s); } catch(e) { currentUser = null; }
  }
  return currentUser;
}

function saveUser(user) {
  currentUser = user;
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
}

function getAllAccounts() {
  const s = localStorage.getItem(ACCOUNTS_KEY);
  if (s) {
    try { return JSON.parse(s); } catch(e) { return []; }
  }
  return [];
}

function saveAllAccounts(accounts) {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

function hashPassword(pwd) {
  let hash = 0;
  for (let i = 0; i < pwd.length; i++) {
    const char = pwd.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16);
}


function completeLogin(account) {
  if (!account) return;
  saveUser(account);
  currentUiLanguage = normalizeUiLanguageName(account.language || getPreferredUiLanguage());
  localStorage.setItem(SITE_LANGUAGE_KEY, currentUiLanguage);
  hideAuthModal();
  applyPageTranslations();
  updateUserDisplay();
  updateTeamVisibility();
  updatePostList();
  const teamOverlay = document.getElementById('team-overlay');
  const completed = localStorage.getItem('teamFormCompleted') === 'true';
  if (!completed && teamOverlay) {
    setTimeout(() => { teamOverlay.style.display = 'flex'; }, 300);
  }
}

function showAuthModal() {
  const modal = document.getElementById('auth-modal');
  if (modal) modal.style.display = 'flex';
}

function hideAuthModal() {
  const modal = document.getElementById('auth-modal');
  if (modal) modal.style.display = 'none';
}

function setLabelText(label, text) {
  if (!label) return;
  const textNode = Array.from(label.childNodes).find((node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0);
  if (textNode) {
    textNode.textContent = `\n          ${text}\n          `;
    return;
  }
  label.insertBefore(document.createTextNode(`${text} `), label.firstChild || null);
}

function applyPageTranslations() {
  const navLinks = document.querySelectorAll('.site-nav > a');
  if (navLinks[0]) navLinks[0].textContent = tUi('browse');
  if (navLinks[1]) navLinks[1].textContent = tUi('post');
  if (navLinks[2]) navLinks[2].textContent = tUi('howItWorks');

  const languageLabel = document.getElementById('site-language-label');
  if (languageLabel) languageLabel.textContent = tUi('language');

  const accountMenuProfile = document.getElementById('change-name-btn');
  if (accountMenuProfile) accountMenuProfile.textContent = tUi('profile');
  const accountMenuLogout = document.getElementById('logout-btn');
  if (accountMenuLogout) accountMenuLogout.textContent = tUi('logout');

  const chatTitle = document.querySelector('.chat-header h3');
  if (chatTitle) chatTitle.textContent = tUi('messages');
  const tabRequests = document.getElementById('tab-requests');
  if (tabRequests) tabRequests.textContent = tUi('requests');
  const tabChats = document.getElementById('tab-chats');
  if (tabChats) tabChats.textContent = tUi('chats');
  const incomingTitle = document.querySelector('#chat-requests h4');
  if (incomingTitle) incomingTitle.textContent = tUi('incomingRequests');
  const chatsTitle = document.querySelector('#chat-list h4');
  if (chatsTitle) chatsTitle.textContent = tUi('yourChats');
  const chatSend = document.getElementById('chat-send');
  if (chatSend) chatSend.textContent = UI_I18N[currentUiLanguage]?.send || UI_I18N.English.send || 'Send';
  const chatMobileClose = document.getElementById('chat-mobile-close');
  if (chatMobileClose) chatMobileClose.textContent = UI_I18N[currentUiLanguage]?.close || UI_I18N.English.close || 'Close';
  const chatMobileToggle = document.getElementById('chat-mobile-toggle');
  if (chatMobileToggle) chatMobileToggle.textContent = tUi('messages');

  const filters = document.querySelectorAll('#browse .filters > label');
  if (filters[0]) setLabelText(filters[0], UI_I18N[currentUiLanguage]?.games || UI_I18N.English.games || 'Games');
  if (filters[1]) setLabelText(filters[1], UI_I18N[currentUiLanguage]?.role || UI_I18N.English.role || 'Role');
  if (filters[2]) setLabelText(filters[2], UI_I18N[currentUiLanguage]?.rank || UI_I18N.English.rank || 'Rank');

  updateUserDisplay();
  if (typeof updatePostList === 'function') updatePostList();
  if (typeof updateOnlinePlayersPanel === 'function') updateOnlinePlayersPanel();
  scheduleDeepPageTranslation();
}

function initSiteLanguageControl() {
  const siteLanguageSelect = document.getElementById('site-language-select');
  if (!siteLanguageSelect) return;

  currentUiLanguage = getPreferredUiLanguage();
  siteLanguageSelect.value = currentUiLanguage;
  applyPageTranslations();

  siteLanguageSelect.addEventListener('change', () => {
    currentUiLanguage = normalizeUiLanguageName(siteLanguageSelect.value);
    localStorage.setItem(SITE_LANGUAGE_KEY, currentUiLanguage);
    if (currentUser) {
      currentUser.language = currentUiLanguage;
      saveUser(currentUser);
      const accounts = getAllAccounts();
      const idx = accounts.findIndex((a) => a.id === currentUser.id);
      if (idx >= 0) {
        accounts[idx] = currentUser;
        saveAllAccounts(accounts);
      }
    }
    applyPageTranslations();
  });
}

function normalizeProfileList(value) {
  if (Array.isArray(value)) {
    return value.map((entry) => String(entry).trim()).filter(Boolean);
  }
  if (typeof value === 'string') {
    return value.split(',').map((entry) => entry.trim()).filter(Boolean);
  }
  return [];
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function createAccount(email, password, displayName, avatarUrl, profile = {}) {
  const accounts = getAllAccounts();
  const existingIdx = accounts.findIndex(a => a.email === email);
  if (existingIdx >= 0) return null;
  const account = {
    id: crypto.randomUUID(),
    email,
    passwordHash: hashPassword(password),
    displayName,
    avatarUrl,
    psnName: profile.psnName || null,
    xboxName: profile.xboxName || null,
    switchName: profile.switchName || null,
    discordName: profile.discordName || null,
    language: profile.language ? String(profile.language).trim() : 'English',
    age: Number.isFinite(Number(profile.age)) ? Number(profile.age) : null,
    timezone: profile.timezone ? String(profile.timezone).trim() : null,
    games: normalizeProfileList(profile.games),
    micEnabled: !!profile.micEnabled,
    playWithAges: normalizeProfileList(profile.playWithAges),
    createdAt: Date.now()
  };
  accounts.push(account);
  saveAllAccounts(accounts);
  return account;
}

function verifyAccount(email, password) {
  const accounts = getAllAccounts();
  const acc = accounts.find(a => a.email === email && a.passwordHash === hashPassword(password));
  return acc || null;
}

function hideAvatarModal() {
  const modal = document.getElementById('avatar-modal');
  if (modal) modal.style.display = 'none';
}

function updateUserDisplay() {
  const accountBtn = document.getElementById('account-btn');
  const accountMenu = document.getElementById('account-menu');
  const authorField = document.getElementById('author');
  if (accountMenu) accountMenu.style.display = 'none';
  if (currentUser && accountBtn) {
    const displayName = currentUser.displayName || 'Player';
    accountBtn.textContent = displayName;
    if (authorField && !authorField.value.trim()) authorField.value = displayName;
  } else if (accountBtn) {
    accountBtn.textContent = tUi('login');
    if (authorField && !authorField.value.trim()) authorField.value = '';
  }
  syncChatComposerState();
}

function getCurrentMessageUsername() {
  return currentUser && currentUser.displayName ? currentUser.displayName.trim() : '';
}

function syncChatComposerState() {
  const canMessage = !!getCurrentMessageUsername();
  const oneVOneBtn = document.getElementById('chat-1v1');
  if (chatSendBtn) chatSendBtn.disabled = !canMessage;
  if (oneVOneBtn) oneVOneBtn.disabled = !canMessage;
  if (chatTextInput) {
    chatTextInput.disabled = !canMessage;
    chatTextInput.placeholder = canMessage ? tUi('writeMessage') : tUi('loginToMessage');
  }
}

function getLiveWebsitePlayerCount() {
  const names = new Set();
  const addName = (value) => {
    if (!value) return;
    const trimmed = String(value).trim();
    if (trimmed) names.add(trimmed.toLowerCase());
  };

  const posts = loadPosts();
  posts.forEach((post) => addName(post.author));

  loadChats().forEach((chat) => {
    (chat.participants || []).forEach(addName);
  });

  loadRequests().forEach((request) => {
    addName(request.from);
    addName(request.to);
  });

  addName(getCurrentMessageUsername());
  return names.size;
}

// Game characters for avatar selection (images from popular games)
const GAME_CHARACTERS = {
  "Apex Legends": [
    "https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1569163139394-de4798aa62b6?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1538481143235-2d225c6e1e34?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1535323627126-e5a1db8fb433?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=150&h=150&fit=crop"
  ],
  "Genshin Impact": [
    "https://images.unsplash.com/photo-1542779411-d33e39e2aaaa?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1577720643272-265e434e4f3f?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1576096160099-112d472c6f1d?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1552337613-74a440642117?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1573481297535-e72ce6b8b419?w=150&h=150&fit=crop"
  ],
  "Fortnite": [
    "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1537903904737-13fc5b3e4db3?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1572986773206-416f06e38d76?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1618825212175-5e325c86fef4?w=150&h=150&fit=crop"
  ],
  "Roblox": [
    "https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1573208135351-84eaf86d621a?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1516912481808-846ec9b29ffd?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1566492031773-3928b67a621c?w=150&h=150&fit=crop"
  ],
  "Overwatch 2": [
    "https://images.unsplash.com/photo-1514432324607-2e467f4af445?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1535405557558-afc4877a26fc?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1539571696357-5a69c006ae30?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1535323627126-e5a1db8fb433?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=150&h=150&fit=crop"
  ],
  "Marvel Rivals": [
    "https://images.unsplash.com/photo-1578926078328-123alangalan?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1537903904737-13fc5b3e4db3?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=150&h=150&fit=crop"
  ],
  "Rocket League": [
    "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1569163139394-de4798aa62b6?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1538481143235-2d225c6e1e34?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1535323627126-e5a1db8fb433?w=150&h=150&fit=crop"
  ],
  "Minecraft": [
    "https://images.unsplash.com/photo-1577720643272-265e434e4f3f?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1542779411-d33e39e2aaaa?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1576096160099-112d472c6f1d?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1552337613-74a440642117?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1573481297535-e72ce6b8b419?w=150&h=150&fit=crop"
  ],
  "Rainbow Six Siege": [
    "https://images.unsplash.com/photo-1572986773206-416f06e38d76?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1537903904737-13fc5b3e4db3?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1618825212175-5e325c86fef4?w=150&h=150&fit=crop"
  ],
  "Fall Guys": [
    "https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1573208135351-84eaf86d621a?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1516912481808-846ec9b29ffd?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1514432324607-2e467f4af445?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1535405557558-afc4877a26fc?w=150&h=150&fit=crop"
  ]
};

function populateAvatarGrid() {
  const grid = document.getElementById('avatar-grid');
  if (!grid) return;
  grid.innerHTML = '';
  let avatarCount = 0;
  for (const game of games) {
    const chars = GAME_CHARACTERS[game] || [];
    for (const char of chars) {
      const avatarBtn = document.createElement('button');
      avatarBtn.type = 'button';
      avatarBtn.className = 'avatar-option';
      avatarBtn.innerHTML = `<img src="${char}" alt="avatar" style="width:100%;height:100%;object-fit:cover;border-radius:8px;" />`;
      avatarBtn.addEventListener('click', () => {
        document.querySelectorAll('.avatar-option').forEach(a => a.classList.remove('selected'));
        avatarBtn.classList.add('selected');
        avatarBtn.dataset.selected = char;
      });
      grid.appendChild(avatarBtn);
      avatarCount++;
      if (avatarCount >= 16) break;
    }
    if (avatarCount >= 16) break;
  }
}

function initAuthFlow() {
  loadUser();
  hideAuthModal();
  hideAvatarModal();
  updateUserDisplay();
}

// Auth modal handlers
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');
const switchSignup = document.getElementById('switch-signup');
const switchLogin = document.getElementById('switch-login');

if (switchSignup) switchSignup.addEventListener('click', () => {
  if (loginForm) loginForm.style.display = 'none';
  if (signupForm) signupForm.style.display = 'block';
});

if (switchLogin) switchLogin.addEventListener('click', () => {
  if (loginForm) loginForm.style.display = 'block';
  if (signupForm) signupForm.style.display = 'none';
});

if (loginBtn) loginBtn.addEventListener('click', () => {
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  const error = document.getElementById('login-error');
  if (!email || !password) {
    if (error) error.textContent = 'Email and password required.';
    return;
  }
  const acc = verifyAccount(email, password);
  if (!acc) {
    if (error) error.textContent = 'Invalid email or password.';
    return;
  }
  completeLogin(acc);
  if (error) error.textContent = '';
});

if (signupBtn) signupBtn.addEventListener('click', () => {
  const email = document.getElementById('signup-email').value.trim();
  const password = document.getElementById('signup-password').value;
  const confirm = document.getElementById('signup-confirm').value;
  const error = document.getElementById('signup-error');
  if (!email || !password || !confirm) {
    if (error) error.textContent = 'Email and password are required.';
    return;
  }
  if (password !== confirm) {
    if (error) error.textContent = 'Passwords do not match.';
    return;
  }
  if (password.length < 4) {
    if (error) error.textContent = 'Password must be at least 4 characters.';
    return;
  }
  const profile = {
    age: document.getElementById('signup-age').value ? parseInt(document.getElementById('signup-age').value, 10) : null,
    timezone: document.getElementById('signup-timezone').value.trim() || null,
    psnName: document.getElementById('signup-psn').value.trim() || null,
    xboxName: document.getElementById('signup-xbox').value.trim() || null,
    switchName: document.getElementById('signup-switch').value.trim() || null,
    discordName: document.getElementById('signup-discord').value.trim() || null,
  };
  const acc = createAccount(email, password, email.split('@')[0], '', profile);
  if (!acc) {
    if (error) error.textContent = 'Email already registered.';
    return;
  }
  saveUser(acc);
  hideAuthModal();
  updateUserDisplay();
  updateTeamVisibility();
  const teamOverlay = document.getElementById('team-overlay');
  if (teamOverlay) {
    setTimeout(() => { teamOverlay.style.display = 'flex'; }, 300);
  }
  if (error) error.textContent = '';
});

const signupSkip = document.getElementById('signup-skip');
if (signupSkip) signupSkip.addEventListener('click', () => {
  ['signup-psn', 'signup-xbox', 'signup-switch', 'signup-discord'].forEach(id => {
    const input = document.getElementById(id);
    if (input) input.value = '';
  });
  alert('Optional handles skipped. You can add them later from your profile.');
});

const accountBtn = document.getElementById('account-btn');
const accountMenu = document.getElementById('account-menu');
const changeNameBtn = document.getElementById('change-name-btn');
const logoutBtn = document.getElementById('logout-btn');

if (accountBtn) {
  accountBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    if (currentUser) {
      if (accountMenu) {
        accountMenu.style.display = accountMenu.style.display === 'block' ? 'none' : 'block';
      }
    } else {
      showAuthModal();
    }
  });
}

document.addEventListener('click', (event) => {
  if (accountMenu && event.target !== accountBtn && !accountMenu.contains(event.target)) {
    accountMenu.style.display = 'none';
  }
});

const closeAuthModalBtn = document.getElementById('close-auth-modal');
if (closeAuthModalBtn) closeAuthModalBtn.addEventListener('click', hideAuthModal);
const authModalElem = document.getElementById('auth-modal');
if (authModalElem) authModalElem.addEventListener('click', (event) => {
  if (event.target === authModalElem) hideAuthModal();
});

if (logoutBtn) logoutBtn.addEventListener('click', () => {
  currentUser = null;
  localStorage.removeItem(AUTH_KEY);
  hideAuthModal();
  if (document.getElementById('login-email')) document.getElementById('login-email').value = '';
  if (document.getElementById('login-password')) document.getElementById('login-password').value = '';
  if (document.getElementById('signup-email')) document.getElementById('signup-email').value = '';
  if (document.getElementById('signup-password')) document.getElementById('signup-password').value = '';
  if (document.getElementById('signup-confirm')) document.getElementById('signup-confirm').value = '';
  updateUserDisplay();
});

if (changeNameBtn) changeNameBtn.addEventListener('click', () => {
  if (currentUser) {
    showProfileModal(currentUser.displayName);
  } else {
    showAuthModal();
  }
  if (accountMenu) accountMenu.style.display = 'none';
});

const closeProfileModalBtn = document.getElementById('close-profile-modal');
if (closeProfileModalBtn) closeProfileModalBtn.addEventListener('click', hideProfileModal);
const profileModalElem = document.getElementById('profile-modal');
if (profileModalElem) profileModalElem.addEventListener('click', (event) => {
  if (event.target === profileModalElem) hideProfileModal();
});

// Avatar selection modal
const displayNameInput = document.getElementById('display-name');
const confirmAvatarBtn = document.getElementById('confirm-avatar');
if (confirmAvatarBtn) confirmAvatarBtn.addEventListener('click', () => {
  const displayName = displayNameInput.value.trim();
  const selected = document.querySelector('.avatar-option.selected');
  if (!displayName) {
    alert('Please enter a display name.');
    return;
  }
  if (!selected || !selected.dataset.selected) {
    alert('Please select an avatar.');
    return;
  }
  currentUser.displayName = displayName;
  currentUser.avatarUrl = selected.dataset.selected;
  saveUser(currentUser);
  const accounts = getAllAccounts();
  const idx = accounts.findIndex(a => a.id === currentUser.id);
  if (idx >= 0) {
    accounts[idx] = currentUser;
    saveAllAccounts(accounts);
  }
  hideAvatarModal();
  updateUserDisplay();
  updatePostList();
});

// ===== MAIN APP DATA =====
const STORAGE_KEY = "crossGameLFG_posts";
const postForm = document.getElementById("post-form");
const postList = document.getElementById("post-list");
const gameFilter = document.getElementById("game-filter");
const roleFilter = document.getElementById("role-filter");
const listingPreview = document.getElementById("listing-preview");
const clearStorageButton = document.getElementById("clear-storage");
const serverButtons = document.querySelectorAll(".server-button");
const gameSelect = document.getElementById("game");
const ageInput = document.getElementById("age");
const teamAgeFrom = document.getElementById("age-from");
const teamAgeTo = document.getElementById("age-to");
const compatibilityMessage = document.getElementById("compatibility-message");
const teamForm = document.getElementById("team-form");
const teamOverlay = document.getElementById("team-overlay");
const teamCloseButton = document.getElementById("team-close");
const teamBackButton = document.getElementById("team-back");
const requestsListElem = document.getElementById('requests-list');
const chatsListElem = document.getElementById('chats-list');
const chatWindowElem = document.getElementById('chat-window');
const chatMessagesElem = document.getElementById('chat-messages');
const chatTextInput = document.getElementById('chat-text');
const chatOneVOneBtn = document.getElementById('chat-1v1');
const chatSendBtn = document.getElementById('chat-send');
const chatGifBtn = null;
const chatPanelElem = document.getElementById('chat-panel');
const chatMobileToggleBtn = document.getElementById('chat-mobile-toggle');
const chatMobileCloseBtn = document.getElementById('chat-mobile-close');

const gamemodeSelect = document.getElementById('gamemode');


// Limited game list as requested — only show these games in the UI
const games = [
  "Apex Legends",
  "Fortnite",
  "Genshin Impact",
  "Minecraft",
  "Marvel Rivals",
  "Overwatch 2",
  "Rainbow Six Siege",
  "Roblox",
  "Rocket League",
  "Valorant"
];


// Per-game ordered rank lists for the selected games
const RANKS = {
  "Apex Legends": ["Rookie","Bronze","Silver","Gold","Platinum","Diamond","Master","Apex Predator"],
  "Fortnite": ["Bronze","Silver","Gold","Platinum","Diamond","Elite","Champion","Unreal"],
  "Genshin Impact": ["No Rank","Traveler","Adventurer","Veteran","Expert"],
  "Minecraft": ["No Rank","Novice","Apprentice","Adept","Expert","Master"],
  "Marvel Rivals": ["No Rank","Bronze","Silver","Gold","Platinum","Diamond","Champion"],
  "Overwatch 2": ["No Rank","Bronze","Silver","Gold","Platinum","Diamond","Master","Grandmaster","Top 500"],
  "Rainbow Six Siege": ["No Rank","Copper","Bronze","Silver","Gold","Platinum","Diamond","Champion"],
  "Roblox": ["No Rank","Beginner","Intermediate","Advanced","Expert"],
  "Rocket League": ["No Rank","Bronze","Silver","Gold","Platinum","Diamond","Champion","Grand Champion","Supersonic Legend"],
  "Valorant": ["No Rank","Iron","Bronze","Silver","Gold","Platinum","Diamond","Ascendant","Immortal","Radiant"],
  // Default fallback
  "__default": ["No Rank", "Beginner", "Intermediate", "Advanced", "Expert", "Pro"]
};

// Helper to get ordered ranks for a game (fallback to default)
function ranksForGame(game) {
  return RANKS[game] || RANKS["__default"];
}

// Game modes for each game
const GAMEMODES = {
  "Fortnite": ["Duos", "Trios", "Squads", "Team Rumble", "Reload", "Fortnite OG", "Creative"],
  "Apex Legends": ["Duos", "Trios", "Squads", "Ranked Duos", "Ranked Trios"],
  "Valorant": ["Unranked", "Ranked", "Deathmatch", "Spike Rush", "Team Deathmatch"],
  "Rocket League": ["2v2", "3v3", "4v4", "Rumble", "Snowday", "Heatseeker", "Hoops", "Dropshot"],
  "Overwatch 2": ["Quick Play", "Competitive", "Arcade", "Deathmatch", "Elimination"],
  "Rainbow Six Siege": ["Unranked", "Ranked", "Casual", "Event"],
  "Minecraft": ["Survival", "Creative", "Adventure", "Speedrun", "SkyBlock", "PvP", "Hypixel", "2b2t", "CubeCraft", "Mineplex", "The Hive", "Lifeboat Network"],
  "Roblox": ["Obby", "Tycoon", "Roleplay", "Combat", "Parkour", "Simulator"],
  "Genshin Impact": ["Open World", "Spiral Abyss", "Domains", "Events", "Co-op"],
  "Marvel Rivals": ["Quick Match", "Ranked", "Team Deathmatch", "Team Objective"],
  "__default": ["Any", "Casual", "Competitive"]
};

function gameModesForGame(game) {
  return GAMEMODES[game] || GAMEMODES["__default"];
}

const gameAccountDatabase = {
  Valorant: {
    vipermain: { rank: "Immortal", stats: "48W / 12L", details: "Radiant climb, 1.5 KD" },
    phantomqueen: { rank: "Ascendant", stats: "34W / 18L", details: "90% headshot accuracy" },
  },
  Minecraft: {
    builderbee: { rank: "Adept Builder", stats: "30 completed maps", details: "7 community servers joined" },
    redstonepro: { rank: "Master Crafter", stats: "4,200 blocks placed", details: "Nether fortress specialist" },
  },
  Fortnite: {
    stormrider: { rank: "Champion", stats: "22 wins this month", details: "Squad power 1450" },
    titanfall: { rank: "Legend", stats: "18 solo wins", details: "Tilted Towers expert" },
  },
  Roblox: {
    rbx_gamer: { rank: "Rising Star", stats: "12 events hosted", details: "Popular obby creator" },
    pixelpal: { rank: "VIP", stats: "55 games played", details: "Top-rated roleplay host" },
  },
  "League of Legends": {
    summonersage: { rank: "Diamond", stats: "60% win rate", details: "Top lane heavy damage" },
  },
  "Apex Legends": {
    skyhunter: { rank: "Apex Predator", stats: "51W / 18L", details: "Wraith main" },
  },
  "Overwatch 2": {
    pulsefire: { rank: "Master", stats: "45% K/D", details: "Support main" },
  },
};

function normalizePlayerName(name) {
  return name.trim().toLowerCase();
}

function lookupGameAccount(name, game) {
  const gameData = gameAccountDatabase[game];
  if (!gameData) return null;
  return gameData[normalizePlayerName(name)] || null;
}

const initialPosts = [
  {
    id: crypto.randomUUID(),
    game: "Valorant",
    author: "ViperMain",
    role: "DPS",
    age: 21,
    platform: "PC",
    server: "North America East",
    rank: "Immortal",
    description: "Looking for a ranked duo or trio. Mic ready, chill voice chat, radiance climbing.",
    createdAt: Date.now() - 3600000,
  },
  {
    id: crypto.randomUUID(),
    game: "Minecraft",
    author: "BuilderBee",
    role: "Casual",
    age: 16,
    platform: "Java",
    server: "EU",
    rank: "Adept Builder",
    description: "Need 2 players for a survival co-op world. Looking for friendly builders and explorers.",
    createdAt: Date.now() - 7200000,
  },
  {
    id: crypto.randomUUID(),
    game: "Fortnite",
    author: "StormRider",
    role: "Squad",
    age: 24,
    platform: "PC",
    server: "North America West",
    rank: "Champion",
    description: "Creative mode and a few Battle Royale rounds. Open to chill teammates.",
    createdAt: Date.now() - 5400000,
  },
  {
    id: crypto.randomUUID(),
    game: "Roblox",
    author: "RBX_Gamer",
    role: "Any",
    age: 17,
    platform: "Mobile",
    server: "Asia",
    rank: "Rising Star",
    description: "Playing a Roblox adventure game, need 3 more players. Friendly and beginner-friendly.",
    createdAt: Date.now() - 3000000,
  },
];

function loadPosts() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialPosts));
    return initialPosts;
  }
  try {
    return JSON.parse(stored) || initialPosts;
  } catch (error) {
    console.error("Could not parse posts", error);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialPosts));
    return initialPosts;
  }
}

function savePosts(posts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

// account persistence functions removed — account connect UI was removed
function saveAccountInfo(info) {
  /* no-op */
}

function loadAccountInfo() {
  return null;
}

function updateAccountStatus() {
  /* no-op */
}

function isAgeRestricted(postAge) {
  const min = parseInt(teamAgeFrom.value, 10);
  const max = parseInt(teamAgeTo.value, 10);
  if (Number.isNaN(min) || Number.isNaN(max)) return false;
  if (min < 18 && max >= 18) return true;
  if (max < 18) return postAge >= 18;
  if (min >= 18) return postAge < 18;
  return false;
}

function setCompatibilityMessage() {
  const min = parseInt(teamAgeFrom.value, 10);
  const max = parseInt(teamAgeTo.value, 10);
  if (Number.isNaN(min) || Number.isNaN(max)) {
    compatibilityMessage.style.display = "none";
    return;
  }
  if (min < 18 && max >= 18) {
    compatibilityMessage.textContent = "Teams cannot mix players under 18 with players 18 and older. Please adjust your age range.";
    compatibilityMessage.style.display = "block";
  } else {
    compatibilityMessage.style.display = "none";
  }
}

// Team form persistence and visibility
function saveTeamInfo(obj) {
  localStorage.setItem('teamInfo', JSON.stringify(obj));
  localStorage.setItem('teamFormCompleted', 'true');
}

function loadTeamInfo() {
  const s = localStorage.getItem('teamInfo');
  return s ? JSON.parse(s) : null;
}

function isTeamFormComplete() {
  if (!teamForm) return false;
  const fields = teamForm.querySelectorAll("input[type='text'], input[type='number'], select, textarea");
  for (const f of fields) {
    // ignore optional checkbox inputs by selector above
    if (f.tagName.toLowerCase() === 'select' || f.type === 'text' || f.type === 'number' || f.tagName.toLowerCase() === 'textarea') {
      if (!f.value || !String(f.value).trim()) return false;
    }
  }
  return true;
}

function updateTeamVisibility() {
  const completed = localStorage.getItem('teamFormCompleted') === 'true';
  if (completed) {
    if (teamOverlay) teamOverlay.style.display = 'none';
  } else {
    if (teamOverlay) teamOverlay.style.display = 'none';
  }
}

function handleTeamSubmit(event) {
  event.preventDefault();
  if (!isTeamFormComplete()) {
    alert('Please fill out all team fields before continuing.');
    return;
  }
  const info = {
    ageFrom: document.getElementById('age-from').value,
    ageTo: document.getElementById('age-to').value,
    location: document.getElementById('location').value,
    language: document.getElementById('language').value,
    microphone: document.getElementById('microphone').checked,
    timezone: document.getElementById('timezone').value,
  };
  saveTeamInfo(info);
  localStorage.setItem('teamFormCompleted', 'true');
  if (teamOverlay) teamOverlay.style.display = 'none';
  alert('Team info saved.');
}

function openTeamOverlay() {
  localStorage.setItem('teamFormCompleted', 'false');
  if (teamOverlay) teamOverlay.style.display = 'flex';
  const info = loadTeamInfo();
  if (info) {
    document.getElementById('age-from').value = info.ageFrom || '';
    document.getElementById('age-to').value = info.ageTo || '';
    document.getElementById('location').value = info.location || '';
    document.getElementById('language').value = info.language || '';
    document.getElementById('microphone').checked = !!info.microphone;
    document.getElementById('timezone').value = info.timezone || '';
  }
}

function handleTeamEdit() {
  openTeamOverlay();
}


function populateGameOptions() {
  // ensure selects are enabled and reset
  if (gameFilter) {
    gameFilter.disabled = false;
    gameFilter.innerHTML = '<option value="all">All games</option>';
    gameFilter.selectedIndex = 0;
  }
  if (gameSelect) {
    gameSelect.disabled = false;
    gameSelect.innerHTML = '';
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.disabled = true;
    placeholder.selected = true;
    placeholder.textContent = 'Select a game';
    gameSelect.appendChild(placeholder);
  }

  const sortedGames = [...games].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
  sortedGames.forEach((game) => {
    if (gameFilter) {
      const optionForFilter = document.createElement("option");
      optionForFilter.value = game;
      optionForFilter.textContent = game;
      gameFilter.appendChild(optionForFilter);
    }

    if (gameSelect) {
      const optionForSelect = document.createElement("option");
      optionForSelect.value = game;
      optionForSelect.textContent = game;
      gameSelect.appendChild(optionForSelect);
    }
  });

  // Initialize rank filter to 'all' (shows combined ranks)
  updateRankFilterForGame('all');
  updateGameModesForGame(gameSelect ? gameSelect.value : '');

}

// Populate the rank filter and the post-form rank select for a given game
function updateRankFilterForGame(game) {
  console.log('updateRankFilterForGame called with:', game);
  const rf = document.getElementById('rank-filter');
  const postRankSelect = document.getElementById('rank');
  console.log('postRankSelect element found:', !!postRankSelect);
  
  // build ranks list
  let ranks = [];
  if (game === 'all' || !game) {
    // show combined unique ranks across all games (in insertion order by games array)
    const seen = new Set();
    for (const g of games) {
      for (const r of ranksForGame(g)) {
        if (!seen.has(r)) {
          seen.add(r);
          ranks.push(r);
        }
      }
    }
  } else {
    ranks = ranksForGame(game).slice();
    console.log('Ranks for', game, ':', ranks);
  }

  if (rf) {
    // top-level options
    rf.innerHTML = '';
    const allOpt = document.createElement('option');
    allOpt.value = 'all';
    allOpt.textContent = 'All ranks';
    rf.appendChild(allOpt);

    const noneOpt = document.createElement('option');
    noneOpt.value = 'none';
    noneOpt.textContent = 'No rank';
    rf.appendChild(noneOpt);

    // per-game entries only
    const sep2 = document.createElement('option');
    sep2.disabled = true;
    sep2.textContent = '--- Ranks by game ---';
    rf.appendChild(sep2);

    if (game === 'all' || !game) {
      // combined: iterate games in order and list each rank with its game suffix
      for (const g of games) {
        const rs = ranksForGame(g);
        for (const r of rs) {
          const opt = document.createElement('option');
          opt.value = `${g}::${r}`;
          opt.textContent = `${r} (${g})`;
          rf.appendChild(opt);
        }
      }
    } else {
      // single game: list ranks with explicit game suffix too
      for (const r of ranks) {
        const opt = document.createElement('option');
        opt.value = `${game}::${r}`;
        opt.textContent = `${r} (${game})`;
        rf.appendChild(opt);
      }
    }
  }

  if (postRankSelect) {
    // initialize post rank select with a placeholder 'Rank' and a 'No rank' option for casual players
    postRankSelect.innerHTML = '';
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.disabled = true;
    placeholder.selected = true;
    placeholder.textContent = 'Rank';
    postRankSelect.appendChild(placeholder);

    // 'No rank' option to allow casual/no-rank posts
    const noRankOpt = document.createElement('option');
    noRankOpt.value = 'none';
    noRankOpt.textContent = 'No rank (casual)';
    postRankSelect.appendChild(noRankOpt);

    // post rank select is context-sensitive: if a specific game was passed, populate with that game's plain ranks
    if (game && game !== 'all') {
      console.log('Populating rank select with', ranks.length, 'ranks for', game);
      ranks.forEach(r => {
        const opt = document.createElement('option');
        opt.value = r;
        opt.textContent = r;
        postRankSelect.appendChild(opt);
      });
    }
  }
  scheduleDeepPageTranslation();
}

function updateGameModesForGame(game) {
  if (!gamemodeSelect) return;
  gamemodeSelect.innerHTML = '';
  const placeholder = document.createElement('option');
  placeholder.value = '';
  placeholder.disabled = true;
  placeholder.selected = true;
  placeholder.textContent = 'Select game mode';
  gamemodeSelect.appendChild(placeholder);
  
  const modes = gameModesForGame(game);
  modes.forEach((mode) => {
    const opt = document.createElement('option');
    opt.value = mode;
    opt.textContent = mode;
    gamemodeSelect.appendChild(opt);
  });
  scheduleDeepPageTranslation();
}

function getSelectedRegion() {
  const activeButton = document.querySelector(".server-button.active");
  return activeButton ? activeButton.dataset.region : "All regions";
}

function formatTimeAgo(timestamp) {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

function isMobileViewport() {
  return window.matchMedia('(max-width: 860px)').matches;
}

function setMobileChatPanelOpen(open) {
  if (!chatPanelElem) return;
  const shouldOpen = !!open && isMobileViewport();
  chatPanelElem.classList.toggle('open', shouldOpen);
  if (chatMobileToggleBtn) {
    chatMobileToggleBtn.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
  }
}

function initMobileChatPanel() {
  if (!chatPanelElem || !chatMobileToggleBtn) return;

  chatMobileToggleBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    setMobileChatPanelOpen(!chatPanelElem.classList.contains('open'));
  });

  if (chatMobileCloseBtn) {
    chatMobileCloseBtn.addEventListener('click', () => {
      setMobileChatPanelOpen(false);
    });
  }

  document.addEventListener('click', (event) => {
    if (!isMobileViewport()) return;
    if (!chatPanelElem.classList.contains('open')) return;
    if (chatPanelElem.contains(event.target)) return;
    if (chatMobileToggleBtn.contains(event.target)) return;
    setMobileChatPanelOpen(false);
  });

  window.addEventListener('resize', () => {
    if (!isMobileViewport()) {
      chatPanelElem.classList.remove('open');
      if (chatMobileToggleBtn) {
        chatMobileToggleBtn.setAttribute('aria-expanded', 'false');
      }
      return;
    }
    setMobileChatPanelOpen(false);
  });

  setMobileChatPanelOpen(false);
}

function createPostCard(post) {
  const card = document.createElement("article");
  card.className = "post-card";
  const gamemodeBadge = post.gamemode ? `<span class="gamemode-badge">${post.gamemode}</span>` : '';
  const gameLabel = post.game || 'Game';
  const rankLabel = post.rank || 'Unranked';
  const authorLabel = post.author || 'Guest';

  card.innerHTML = `
    <div class="post-meta-compact">
      <span class="game-pill"><strong>${gameLabel}</strong></span>
      <span class="rank-pill">${rankLabel}</span>
      <span class="author-pill">${authorLabel}</span>
      <span class="time-pill">${formatTimeAgo(post.createdAt)}</span>
    </div>
    ${gamemodeBadge}
    <p class="post-desc-compact">${post.description || ''}</p>
    <div class="post-actions-compact">
      <button class="button button-primary request-button" type="button">Chat</button>
      <button class="button button-secondary profile-button" type="button" title="View this player's profile">Profile</button>
    </div>
  `;

  const reqBtn = card.querySelector('.request-button');
  reqBtn.addEventListener('click', () => {
    const authorInput = document.getElementById('author');
    const requester = currentUser ? currentUser.displayName : (authorInput && authorInput.value.trim()) || prompt('Enter your display name to send the request:', 'Guest') || 'Guest';
    if (!confirm(`Send chat request to ${post.author} from ${requester}?`)) return;
    const requests = loadRequests();
    const r = {
      id: crypto.randomUUID(),
      postId: post.id,
      from: requester,
      to: post.author,
      status: 'pending',
      createdAt: Date.now()
    };
    requests.unshift(r);
    saveRequests(requests);
    updateRequestsUI();
    alert('Request sent. If the recipient accepts, a chat will appear in the Messages panel.');
  });

  const profileBtn = card.querySelector('.profile-button');
  profileBtn.addEventListener('click', () => {
    showProfileModal(post.author);
  });

  return card;
}

function updatePostList() {
  const posts = loadPosts();
  const selectedGame = gameFilter.value;
  const selectedRole = roleFilter.value;
  const selectedRegion = getSelectedRegion();
  const rankFilterElem = document.getElementById('rank-filter');
  const selectedRankVal = rankFilterElem ? rankFilterElem.value : 'all';

  // parse encoded rank value which may be in the form 'Game::Rank' or 'ANY::Rank'
  let selectedRankGame = null;
  let selectedRankName = null;
  if (selectedRankVal && selectedRankVal !== 'all' && selectedRankVal !== 'none') {
    const parts = selectedRankVal.split('::');
    if (parts.length === 2) {
      selectedRankGame = parts[0];
      selectedRankName = parts[1];
    } else {
      selectedRankName = selectedRankVal;
    }
  }

  const filtered = posts.filter((post) => {
    const matchesGame = selectedGame === "all" || post.game === selectedGame;
    const matchesRole = selectedRole === "all" || post.role.toLowerCase().includes(selectedRole.toLowerCase());
    const postServer = post.server || "Any";
    const matchesRegion = selectedRegion === "All regions" || postServer === selectedRegion;
    const matchesAge = !isAgeRestricted(post.age || 18);
    let matchesRank = true;
    if (selectedRankVal === 'none') {
      matchesRank = !post.rank;
    } else if (selectedRankVal && selectedRankVal !== 'all') {
      if (selectedRankGame === 'ANY') {
        matchesRank = post.rank === selectedRankName;
      } else if (selectedRankGame) {
        matchesRank = post.game === selectedRankGame && post.rank === selectedRankName;
      } else {
        matchesRank = post.rank === selectedRankName;
      }
    }
    return matchesGame && matchesRole && matchesRegion && matchesAge && matchesRank;
  });

  const livePlayersCount = getLiveWebsitePlayerCount();
  if (!postList) return;

  postList.innerHTML = "";
  if (filtered.length === 0) {
    postList.innerHTML = `
      <div class="post-card">
        <h3>No matches yet</h3>
        <p>Try another game or post your own session to get started.</p>
      </div>
    `;
  } else {
    const fragment = document.createDocumentFragment();
    filtered.forEach((post) => {
      fragment.appendChild(createPostCard(post));
    });
    postList.appendChild(fragment);
  }

  listingPreview.innerHTML = `
    <div class="people-count-box">
      <div class="people-count-label">${escapeHtml(tUi('livePlayersOnWebsite'))}</div>
      <div class="people-count-number">${livePlayersCount}</div>
    </div>
  `;
}

function findAccountByDisplayName(displayName) {
  if (!displayName) return null;
  const accounts = getAllAccounts();
  return accounts.find(acc => acc.displayName === displayName) || null;
}

function findAccountById(userId) {
  if (!userId) return null;
  const accounts = getAllAccounts();
  return accounts.find(acc => acc.id === userId) || null;
}

const PROFILE_LANGUAGE_LABELS = {
  English: 'English',
  Spanish: 'Español',
  Portuguese: 'Português',
  French: 'Français',
  German: 'Deutsch',
  Chinese: '中文',
  Japanese: '日本語',
  Korean: '한국어'
};

const PROFILE_I18N = {
  English: {
    playerProfile: 'Player Profile',
    noProfileInfo: 'No profile information is available for this player.',
    basicInfo: 'Basic info',
    username: 'Username',
    age: 'Age',
    selectAge: 'Select age',
    timezone: 'Timezone',
    selectTimezone: 'Select timezone',
    language: 'Language',
    psnName: 'PSN Name',
    xboxName: 'Xbox Name',
    nintendoName: 'Nintendo Name',
    discord: 'Discord',
    gamerPreferences: 'Gamer preferences',
    gamesYouPlay: 'Games you play',
    micAvailable: 'Mic available',
    playWithAgeGroups: 'Play with age groups',
    saveProfile: 'Save Profile',
    notAdded: 'Not added',
    micAvailableText: 'Mic available',
    micUnavailableText: 'No mic',
    openToPlayingWith: 'Open to playing with',
    selectedDetails: 'Selected details',
    preference: 'Preference',
    noSelectedDetails: 'No selected details yet.',
    profileSaved: 'Profile saved.'
  },
  Spanish: {
    playerProfile: 'Perfil del jugador',
    noProfileInfo: 'No hay informacion de perfil para este jugador.',
    basicInfo: 'Informacion basica',
    username: 'Nombre de usuario',
    age: 'Edad',
    selectAge: 'Selecciona edad',
    timezone: 'Zona horaria',
    selectTimezone: 'Selecciona zona horaria',
    language: 'Idioma',
    psnName: 'Nombre de PSN',
    xboxName: 'Nombre de Xbox',
    nintendoName: 'Nombre de Nintendo',
    discord: 'Discord',
    gamerPreferences: 'Preferencias de juego',
    gamesYouPlay: 'Juegos que juegas',
    micAvailable: 'Microfono disponible',
    playWithAgeGroups: 'Jugar con grupos de edad',
    saveProfile: 'Guardar perfil',
    notAdded: 'No agregado',
    micAvailableText: 'Microfono disponible',
    micUnavailableText: 'Sin microfono',
    openToPlayingWith: 'Disponible para jugar con',
    selectedDetails: 'Detalles seleccionados',
    preference: 'Preferencia',
    noSelectedDetails: 'Sin detalles seleccionados todavia.',
    profileSaved: 'Perfil guardado.'
  },
  Portuguese: {
    playerProfile: 'Perfil do jogador',
    noProfileInfo: 'Nao ha informacoes de perfil para este jogador.',
    basicInfo: 'Informacoes basicas',
    username: 'Nome de usuario',
    age: 'Idade',
    selectAge: 'Selecione idade',
    timezone: 'Fuso horario',
    selectTimezone: 'Selecione fuso horario',
    language: 'Idioma',
    psnName: 'Nome da PSN',
    xboxName: 'Nome do Xbox',
    nintendoName: 'Nome da Nintendo',
    discord: 'Discord',
    gamerPreferences: 'Preferencias de jogo',
    gamesYouPlay: 'Jogos que voce joga',
    micAvailable: 'Microfone disponivel',
    playWithAgeGroups: 'Jogar com faixas de idade',
    saveProfile: 'Salvar perfil',
    notAdded: 'Nao adicionado',
    micAvailableText: 'Microfone disponivel',
    micUnavailableText: 'Sem microfone',
    openToPlayingWith: 'Disponivel para jogar com',
    selectedDetails: 'Detalhes selecionados',
    preference: 'Preferencia',
    noSelectedDetails: 'Nenhum detalhe selecionado ainda.',
    profileSaved: 'Perfil salvo.'
  },
  French: {
    playerProfile: 'Profil du joueur',
    noProfileInfo: 'Aucune information de profil pour ce joueur.',
    basicInfo: 'Informations de base',
    username: "Nom d'utilisateur",
    age: 'Age',
    selectAge: "Selectionner l'age",
    timezone: 'Fuseau horaire',
    selectTimezone: 'Selectionner le fuseau horaire',
    language: 'Langue',
    psnName: 'Nom PSN',
    xboxName: 'Nom Xbox',
    nintendoName: 'Nom Nintendo',
    discord: 'Discord',
    gamerPreferences: 'Preferences de jeu',
    gamesYouPlay: 'Jeux auxquels vous jouez',
    micAvailable: 'Micro disponible',
    playWithAgeGroups: "Jouer avec des groupes d'age",
    saveProfile: 'Enregistrer le profil',
    notAdded: 'Non ajoute',
    micAvailableText: 'Micro disponible',
    micUnavailableText: 'Pas de micro',
    openToPlayingWith: 'Disponible pour jouer avec',
    selectedDetails: 'Details selectionnes',
    preference: 'Preference',
    noSelectedDetails: 'Aucun detail selectionne pour le moment.',
    profileSaved: 'Profil enregistre.'
  },
  German: {
    playerProfile: 'Spielerprofil',
    noProfileInfo: 'Keine Profilinformationen fur diesen Spieler verfugbar.',
    basicInfo: 'Grundinfos',
    username: 'Benutzername',
    age: 'Alter',
    selectAge: 'Alter auswahlen',
    timezone: 'Zeitzone',
    selectTimezone: 'Zeitzone auswahlen',
    language: 'Sprache',
    psnName: 'PSN Name',
    xboxName: 'Xbox Name',
    nintendoName: 'Nintendo Name',
    discord: 'Discord',
    gamerPreferences: 'Spieler Einstellungen',
    gamesYouPlay: 'Spiele, die du spielst',
    micAvailable: 'Mikro verfugbar',
    playWithAgeGroups: 'Mit Altersgruppen spielen',
    saveProfile: 'Profil speichern',
    notAdded: 'Nicht hinzugefugt',
    micAvailableText: 'Mikro verfugbar',
    micUnavailableText: 'Kein Mikro',
    openToPlayingWith: 'Offen zum Spielen mit',
    selectedDetails: 'Ausgewahlte Details',
    preference: 'Einstellung',
    noSelectedDetails: 'Noch keine Details ausgewahlt.',
    profileSaved: 'Profil gespeichert.'
  },
  Chinese: {
    playerProfile: '玩家资料',
    noProfileInfo: '此玩家没有可用的资料。',
    basicInfo: '基本信息',
    username: '用户名',
    age: '年龄',
    selectAge: '选择年龄',
    timezone: '时区',
    selectTimezone: '选择时区',
    language: '语言',
    psnName: 'PSN 名称',
    xboxName: 'Xbox 名称',
    nintendoName: 'Nintendo 名称',
    discord: 'Discord',
    gamerPreferences: '玩家偏好',
    gamesYouPlay: '你玩的游戏',
    micAvailable: '麦克风可用',
    playWithAgeGroups: '可一起玩的年龄段',
    saveProfile: '保存资料',
    notAdded: '未添加',
    micAvailableText: '麦克风可用',
    micUnavailableText: '无麦克风',
    openToPlayingWith: '愿意一起玩的对象',
    selectedDetails: '已选详情',
    preference: '偏好',
    noSelectedDetails: '暂无已选详情。',
    profileSaved: '资料已保存。'
  },
  Japanese: {
    playerProfile: 'プレイヤープロフィール',
    noProfileInfo: 'このプレイヤーのプロフィール情報はありません。',
    basicInfo: '基本情報',
    username: 'ユーザー名',
    age: '年齢',
    selectAge: '年齢を選択',
    timezone: 'タイムゾーン',
    selectTimezone: 'タイムゾーンを選択',
    language: '言語',
    psnName: 'PSN名',
    xboxName: 'Xbox名',
    nintendoName: 'Nintendo名',
    discord: 'Discord',
    gamerPreferences: 'ゲーム設定',
    gamesYouPlay: 'プレイするゲーム',
    micAvailable: 'マイクあり',
    playWithAgeGroups: '一緒に遊ぶ年齢層',
    saveProfile: 'プロフィールを保存',
    notAdded: '未設定',
    micAvailableText: 'マイクあり',
    micUnavailableText: 'マイクなし',
    openToPlayingWith: '一緒に遊べる対象',
    selectedDetails: '選択済み詳細',
    preference: '設定',
    noSelectedDetails: '選択済みの詳細はまだありません。',
    profileSaved: 'プロフィールを保存しました。'
  },
  Korean: {
    playerProfile: '플레이어 프로필',
    noProfileInfo: '이 플레이어의 프로필 정보가 없습니다.',
    basicInfo: '기본 정보',
    username: '사용자 이름',
    age: '나이',
    selectAge: '나이 선택',
    timezone: '시간대',
    selectTimezone: '시간대 선택',
    language: '언어',
    psnName: 'PSN 이름',
    xboxName: 'Xbox 이름',
    nintendoName: 'Nintendo 이름',
    discord: 'Discord',
    gamerPreferences: '게이머 선호',
    gamesYouPlay: '플레이하는 게임',
    micAvailable: '마이크 사용',
    playWithAgeGroups: '함께할 나이대',
    saveProfile: '프로필 저장',
    notAdded: '미등록',
    micAvailableText: '마이크 사용',
    micUnavailableText: '마이크 없음',
    openToPlayingWith: '함께 플레이할 대상',
    selectedDetails: '선택한 정보',
    preference: '선호',
    noSelectedDetails: '아직 선택한 정보가 없습니다.',
    profileSaved: '프로필이 저장되었습니다.'
  }
};

function normalizeUiLanguage(language) {
  return normalizeUiLanguageName(language);
}

function tProfile(language, key) {
  const lang = normalizeUiLanguage(language);
  return (PROFILE_I18N[lang] && PROFILE_I18N[lang][key]) || PROFILE_I18N.English[key] || key;
}

function profileLanguageOptionsMarkup(selectedLanguage) {
  return Object.keys(PROFILE_LANGUAGE_LABELS).map((lang) => {
    const selected = lang === selectedLanguage ? 'selected' : '';
    return `<option value="${escapeHtml(lang)}" ${selected}>${escapeHtml(PROFILE_LANGUAGE_LABELS[lang])}</option>`;
  }).join('');
}

function applyProfileModalLanguage(language) {
  const profileContent = document.getElementById('profile-content');
  if (!profileContent) return;
  const t = (key) => tProfile(language, key);

  const title = document.getElementById('profile-modal-title');
  if (title) title.textContent = t('playerProfile');

  profileContent.querySelectorAll('[data-i18n]').forEach((node) => {
    const key = node.getAttribute('data-i18n');
    if (!key) return;
    node.textContent = t(key);
  });

  const profileLanguageSelect = document.getElementById('profile-language');
  if (profileLanguageSelect) {
    profileLanguageSelect.setAttribute('aria-label', t('language'));
  }
}

function renderProfileDetails(account, isEditable, uiLanguageOverride) {
  const uiLanguage = normalizeUiLanguage(uiLanguageOverride || (account && account.language) || (currentUser && currentUser.language) || 'English');
  const t = (key) => tProfile(uiLanguage, key);

  if (!account) {
    return `<p style="color:#cbd5e1;">${escapeHtml(t('noProfileInfo'))}</p>`;
  }

  const safeDisplayName = escapeHtml(account.displayName || 'Player');
  const ageValue = Number.isFinite(Number(account.age)) ? `${account.age}` : '';
  const timezoneValue = account.timezone ? escapeHtml(account.timezone) : '';
  const selectedGames = normalizeProfileList(account.games);
  const playWithAges = normalizeProfileList(account.playWithAges);
  const languageValue = normalizeUiLanguage(account.language || uiLanguage);
  const timezoneOptions = ['EST', 'EDT', 'CST', 'CDT', 'MST', 'MDT', 'PST', 'PDT', 'GMT', 'UTC', 'EU', 'NA', 'Asia', 'Oceania'];
  const profileSummary = [
    account.age ? `${t('age')}: ${account.age}` : null,
    account.timezone ? `${t('timezone')}: ${account.timezone}` : null,
    account.language ? `${t('language')}: ${account.language}` : null,
    account.psnName ? `PSN: ${account.psnName}` : null,
    account.xboxName ? `Xbox: ${account.xboxName}` : null,
    account.switchName ? `${t('nintendoName')}: ${account.switchName}` : null,
    account.discordName ? `${t('discord')}: ${account.discordName}` : null,
    account.micEnabled ? `${t('micAvailable')}: ${t('micAvailableText')}` : `${t('micAvailable')}: ${t('micUnavailableText')}`,
    selectedGames.length ? `${t('gamesYouPlay')}: ${selectedGames.join(', ')}` : null,
    playWithAges.length ? `${t('playWithAgeGroups')}: ${playWithAges.join(', ')}` : null
  ].filter(Boolean);
  const timezoneMarkup = timezoneOptions.map((tz) => {
    const selected = account.timezone === tz ? 'selected' : '';
    return `<option value="${escapeHtml(tz)}" ${selected}>${escapeHtml(tz)}</option>`;
  }).join('');
  const ageOptionsMarkup = Array.from({ length: 51 }, (_, index) => 10 + index).map((age) => {
    const selected = ageValue === String(age) ? 'selected' : '';
    return `<option value="${age}" ${selected}>${age}</option>`;
  }).join('');
  const gamePills = selectedGames.length
    ? selectedGames.map((game) => `<span class="profile-pill">${escapeHtml(game)}</span>`).join('')
    : `<span class="profile-empty">${escapeHtml(t('notAdded'))}</span>`;
  const playWithPills = playWithAges.length
    ? playWithAges.map((ageRange) => `<span class="profile-pill">${escapeHtml(ageRange)}</span>`).join('')
    : `<span class="profile-empty">${escapeHtml(t('notAdded'))}</span>`;

  if (isEditable) {
    return `
      <div class="profile-editor-shell">
        <div class="profile-section-card">
          <h3 data-i18n="basicInfo">${escapeHtml(t('basicInfo'))}</h3>
          <div class="profile-edit-grid">
            <label class="full-width">
              <span data-i18n="username">${escapeHtml(t('username'))}</span>
              <input id="profile-username" type="text" value="${escapeHtml(account.displayName || '')}" />
            </label>
            <label>
              <span data-i18n="age">${escapeHtml(t('age'))}</span>
              <select id="profile-age">
                <option value="">${escapeHtml(t('selectAge'))}</option>
                ${ageOptionsMarkup}
              </select>
            </label>
            <label>
              <span data-i18n="timezone">${escapeHtml(t('timezone'))}</span>
              <select id="profile-timezone">
                <option value="">${escapeHtml(t('selectTimezone'))}</option>
                ${timezoneMarkup}
              </select>
            </label>
            <label>
              <span data-i18n="language">${escapeHtml(t('language'))}</span>
              <select id="profile-language">
                ${profileLanguageOptionsMarkup(languageValue)}
              </select>
            </label>
            <label>
              <span data-i18n="psnName">${escapeHtml(t('psnName'))}</span>
              <input id="profile-psn" type="text" value="${escapeHtml(account.psnName || '')}" />
            </label>
            <label>
              <span data-i18n="xboxName">${escapeHtml(t('xboxName'))}</span>
              <input id="profile-xbox" type="text" value="${escapeHtml(account.xboxName || '')}" />
            </label>
            <label>
              <span data-i18n="nintendoName">${escapeHtml(t('nintendoName'))}</span>
              <input id="profile-switch" type="text" value="${escapeHtml(account.switchName || '')}" />
            </label>
            <label>
              <span data-i18n="discord">${escapeHtml(t('discord'))}</span>
              <input id="profile-discord" type="text" value="${escapeHtml(account.discordName || '')}" />
            </label>
          </div>
        </div>
        <div class="profile-section-card">
          <h3 data-i18n="gamerPreferences">${escapeHtml(t('gamerPreferences'))}</h3>
          <div class="profile-edit-grid">
            <div class="full-width">
              <label style="margin-bottom:0.5rem;"><span data-i18n="gamesYouPlay">${escapeHtml(t('gamesYouPlay'))}</span></label>
              <div id="profile-games" class="profile-option-grid">
                ${games.map((game) => {
                  const checked = selectedGames.includes(game) ? 'checked' : '';
                  return `<label class="profile-checkbox-pill"><input type="checkbox" value="${escapeHtml(game)}" ${checked} /> ${escapeHtml(game)}</label>`;
                }).join('')}
              </div>
            </div>
            <label>
              <span data-i18n="micAvailable">${escapeHtml(t('micAvailable'))}</span>
              <input id="profile-mic" type="checkbox" ${account.micEnabled ? 'checked' : ''} />
            </label>
            <div class="full-width">
              <label style="margin-bottom:0.5rem;"><span data-i18n="playWithAgeGroups">${escapeHtml(t('playWithAgeGroups'))}</span></label>
              <div id="profile-age-groups" class="profile-option-grid">
                ${['10-13', '13-15', '15-17', '18-60'].map((group) => {
                  const checked = playWithAges.includes(group) ? 'checked' : '';
                  return `<label class="profile-checkbox-pill"><input type="checkbox" value="${escapeHtml(group)}" ${checked} /> ${escapeHtml(group)}</label>`;
                }).join('')}
              </div>
            </div>
          </div>
        </div>
        <button id="profile-save-btn" class="button button-primary" type="button" data-i18n="saveProfile">${escapeHtml(t('saveProfile'))}</button>
      </div>
    `;
  }

  return `
    <div class="profile-editor-shell">
      <div class="profile-section-card">
        <h3 data-i18n="basicInfo">${escapeHtml(t('basicInfo'))}</h3>
        <div class="profile-edit-grid">
          <div class="profile-row full-width">
            <span class="profile-label" data-i18n="username">${escapeHtml(t('username'))}</span>
            <span class="profile-value">${safeDisplayName}</span>
          </div>
          <div class="profile-row">
            <span class="profile-label" data-i18n="age">${escapeHtml(t('age'))}</span>
            <span class="profile-value">${ageValue ? escapeHtml(ageValue) : `<span class="profile-empty">${escapeHtml(t('notAdded'))}</span>`}</span>
          </div>
          <div class="profile-row">
            <span class="profile-label" data-i18n="timezone">${escapeHtml(t('timezone'))}</span>
            <span class="profile-value">${timezoneValue ? timezoneValue : `<span class="profile-empty">${escapeHtml(t('notAdded'))}</span>`}</span>
          </div>
          <div class="profile-row">
            <span class="profile-label" data-i18n="language">${escapeHtml(t('language'))}</span>
            <span class="profile-value">${escapeHtml(languageValue)}</span>
          </div>
          <div class="profile-row">
            <span class="profile-label">PSN</span>
            <span class="profile-value">${account.psnName ? escapeHtml(account.psnName) : `<span class="profile-empty">${escapeHtml(t('notAdded'))}</span>`}</span>
          </div>
          <div class="profile-row">
            <span class="profile-label">Xbox</span>
            <span class="profile-value">${account.xboxName ? escapeHtml(account.xboxName) : `<span class="profile-empty">${escapeHtml(t('notAdded'))}</span>`}</span>
          </div>
          <div class="profile-row">
            <span class="profile-label" data-i18n="nintendoName">${escapeHtml(t('nintendoName'))}</span>
            <span class="profile-value">${account.switchName ? escapeHtml(account.switchName) : `<span class="profile-empty">${escapeHtml(t('notAdded'))}</span>`}</span>
          </div>
          <div class="profile-row">
            <span class="profile-label" data-i18n="discord">${escapeHtml(t('discord'))}</span>
            <span class="profile-value">${account.discordName ? escapeHtml(account.discordName) : `<span class="profile-empty">${escapeHtml(t('notAdded'))}</span>`}</span>
          </div>
        </div>
      </div>
      <div class="profile-section-card">
        <h3 data-i18n="gamerPreferences">${escapeHtml(t('gamerPreferences'))}</h3>
        <div class="profile-edit-grid">
          <div class="profile-row full-width">
            <span class="profile-label" data-i18n="gamesYouPlay">${escapeHtml(t('gamesYouPlay'))}</span>
            <span class="profile-value">${gamePills}</span>
          </div>
          <div class="profile-row">
            <span class="profile-label" data-i18n="micAvailable">${escapeHtml(t('micAvailable'))}</span>
            <span class="profile-value">${account.micEnabled ? escapeHtml(t('micAvailableText')) : escapeHtml(t('micUnavailableText'))}</span>
          </div>
          <div class="profile-row full-width">
            <span class="profile-label" data-i18n="openToPlayingWith">${escapeHtml(t('openToPlayingWith'))}</span>
            <span class="profile-value">${playWithPills}</span>
          </div>
        </div>
      </div>
      <div class="profile-section-card">
        <h3 data-i18n="selectedDetails">${escapeHtml(t('selectedDetails'))}</h3>
        <div class="profile-edit-grid">
          ${profileSummary.length ? profileSummary.map((entry) => `
            <div class="profile-row full-width">
              <span class="profile-label" data-i18n="preference">${escapeHtml(t('preference'))}</span>
              <span class="profile-value">${escapeHtml(entry)}</span>
            </div>
          `).join('') : `
            <div class="profile-row full-width">
              <span class="profile-value"><span class="profile-empty" data-i18n="noSelectedDetails">${escapeHtml(t('noSelectedDetails'))}</span></span>
            </div>
          `}
        </div>
      </div>
    </div>
  `;
}


function showProfileModal(displayName) {
  const profileModal = document.getElementById('profile-modal');
  const profileContent = document.getElementById('profile-content');
  const profileModalTitle = document.getElementById('profile-modal-title');
  if (!profileModal || !profileContent) return;

  let account = null;
  if (currentUser && currentUser.displayName === displayName) {
    account = currentUser;
  } else {
    account = findAccountByDisplayName(displayName);
  }

  const isEditable = currentUser && account && currentUser.id === account.id;
  const uiLanguage = normalizeUiLanguage(currentUiLanguage || (isEditable && account && account.language) || (currentUser && currentUser.language) || 'English');
  profileContent.innerHTML = renderProfileDetails(account, isEditable, uiLanguage);
  if (profileModalTitle) {
    profileModalTitle.textContent = tProfile(uiLanguage, 'playerProfile');
  }
  applyProfileModalLanguage(uiLanguage);
  profileModal.style.display = 'flex';

  const profileLanguageSelect = document.getElementById('profile-language');
  if (profileLanguageSelect) {
    profileLanguageSelect.addEventListener('change', () => {
      applyProfileModalLanguage(profileLanguageSelect.value);
    });
  }

  const profileSaveBtn = document.getElementById('profile-save-btn');
  if (profileSaveBtn) {
    profileSaveBtn.addEventListener('click', () => {
      if (!currentUser || !account) return;
      const profileUsername = document.getElementById('profile-username').value.trim();
      const profileAge = document.getElementById('profile-age').value ? parseInt(document.getElementById('profile-age').value, 10) : null;
      const profileTimezone = document.getElementById('profile-timezone').value.trim();
      const psnName = document.getElementById('profile-psn').value.trim();
      const xboxName = document.getElementById('profile-xbox').value.trim();
      const switchName = document.getElementById('profile-switch').value.trim();
      const discordName = document.getElementById('profile-discord').value.trim();
      const profileLanguage = document.getElementById('profile-language') ? document.getElementById('profile-language').value.trim() : (currentUser.language || 'English');
      const selectedGames = Array.from(document.querySelectorAll('#profile-games input[type="checkbox"]:checked')).map((input) => input.value.trim()).filter(Boolean);
      const micEnabled = document.getElementById('profile-mic').checked;
      const playWithAges = Array.from(document.querySelectorAll('#profile-age-groups input[type="checkbox"]:checked')).map((input) => input.value.trim()).filter(Boolean);

      currentUser.displayName = profileUsername || currentUser.displayName;
      currentUser.age = Number.isFinite(profileAge) ? profileAge : null;
      currentUser.timezone = profileTimezone || null;
      currentUser.psnName = psnName || null;
      currentUser.xboxName = xboxName || null;
      currentUser.switchName = switchName || null;
      currentUser.discordName = discordName || null;
      currentUser.language = normalizeUiLanguage(profileLanguage);
      currentUser.games = selectedGames;
      currentUser.micEnabled = micEnabled;
      currentUser.playWithAges = playWithAges;
      saveUser(currentUser);
      const accounts = getAllAccounts();
      const idx = accounts.findIndex(a => a.id === currentUser.id);
      if (idx >= 0) {
        accounts[idx] = currentUser;
        saveAllAccounts(accounts);
      }
      updateUserDisplay();
      updatePostList();
      alert(tProfile(currentUser.language, 'profileSaved'));
      profileModal.style.display = 'none';
    }, { once: true });
  }
}

function hideProfileModal() {
  const profileModal = document.getElementById('profile-modal');
  if (profileModal) profileModal.style.display = 'none';
}

// Online players panel: counts per game (updates every 5s)
function loadRequests() {
  try { return JSON.parse(localStorage.getItem('teamup_requests')||'[]'); } catch(e){return []}
}
function saveRequests(reqs) { localStorage.setItem('teamup_requests', JSON.stringify(reqs)); }
function loadChats() { try { return JSON.parse(localStorage.getItem('teamup_chats')||'[]'); } catch(e){return []} }
function saveChats(chats) { localStorage.setItem('teamup_chats', JSON.stringify(chats)); }

// Game stats - estimated live concurrent players right now
const GAME_STATS = {
  "Fortnite": 4567432,
  "Apex Legends": 465812,
  "Valorant": 892134,
  "Rocket League": 134579,
  "Overwatch 2": 684321,
  "Rainbow Six Siege": 156732,
  "Minecraft": 1376543,
  "Roblox": 1987654,
  "Genshin Impact": 512379,
  "Marvel Rivals": 21897
};

const GAME_VARIATION_SETTINGS = {
  "Fortnite": { amplitude: 25000, period: 90, phase: 3 },
  "Apex Legends": { amplitude: 8000, period: 70, phase: 11 },
  "Valorant": { amplitude: 12000, period: 60, phase: 17 },
  "Rocket League": { amplitude: 4000, period: 50, phase: 23 },
  "Overwatch 2": { amplitude: 7000, period: 80, phase: 29 },
  "Rainbow Six Siege": { amplitude: 5000, period: 100, phase: 31 },
  "Minecraft": { amplitude: 25000, period: 120, phase: 37 },
  "Roblox": { amplitude: 30000, period: 110, phase: 41 },
  "Genshin Impact": { amplitude: 9000, period: 95, phase: 43 },
  "Marvel Rivals": { amplitude: 1200, period: 45, phase: 47 }
};

function formatPlayerCount(count) {
  if (count == null || typeof count !== 'number') return '0';
  return new Intl.NumberFormat('en-US').format(count);
}

function normalizeFortniteCount(count) {
  if (typeof count !== 'number') return null;
  return Math.round(count);
}

function getSimulatedPlayerCount(game) {
  const base = GAME_STATS[game] || 100000;
  const settings = GAME_VARIATION_SETTINGS[game] || { amplitude: Math.round(base * 0.03), period: 80, phase: 0 };
  const now = Date.now() / 1000;
  const offset = Math.sin((now + settings.phase) / settings.period) * settings.amplitude;
  const secondary = Math.cos((now + settings.phase * 1.3) / (settings.period * 1.2)) * (settings.amplitude * 0.4);
  return Math.max(0, Math.round(base + offset + secondary));
}

async function updateOnlinePlayersPanel() {
  const container = document.getElementById('online-players');
  if (!container) return;
  container.innerHTML = '';

  games.forEach(g => {
   const btn = document.createElement('button');
   btn.type = 'button';
   btn.className = 'button button-secondary server-button';
   btn.dataset.game = g;
   const playerCount = getSimulatedPlayerCount(g);
  btn.textContent = `${g} — ${formatPlayerCount(playerCount)} ${tUi('players')}`;
   btn.addEventListener('click', () => {
     if (gameFilter) gameFilter.value = g;
      updateRankFilterForGame(g);
      updatePostList();
      const siblings = container.querySelectorAll('.server-button');
      siblings.forEach(s => s.classList.remove('active'));
      btn.classList.add('active');
    });
    container.appendChild(btn);
  });

  const ts = document.createElement('div');
  ts.style.marginTop = '0.75rem';
  ts.style.color = '#94a3b8';
  ts.style.fontSize = '0.85rem';
  ts.textContent = `${tUi('playersWorldwideNow')} • ${tUi('updated')} ${new Date().toLocaleTimeString()}`;
  container.appendChild(ts);

  updateRequestsUI();
}

// start updating online players panel periodically
setInterval(updateOnlinePlayersPanel, 5000);
function initOnlinePanel() { updateOnlinePlayersPanel(); }
initOnlinePanel();

// Profanity filter setup
const BAD_WORDS = ["fuck","shit","bitch","asshole","damn","cunt","nigger","slur"];
function containsBadWord(text) {
  if (!text) return false;
  const normalized = text.toLowerCase();
  // simple word boundary check
  return BAD_WORDS.some((w) => new RegExp(`\\b${w}\\b`, 'i').test(normalized));
}

function containsPersonalInfo(text) {
  if (!text) return false;
  const normalized = text.toLowerCase();
  const emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i;
  const addressPattern = /\b\d{1,5}\s+(street|st|road|rd|avenue|ave|boulevard|blvd|lane|ln|drive|dr|court|ct|square|sq|trail|trl|parkway|pkwy|place|pl)\b/i;
  const cityPattern = /\b(city|town|village)\b/i;
  const knownCities = [
    'new york','los angeles','chicago','houston','phoenix','philadelphia','san antonio','san diego','dallas','san jose',
    'austin','jacksonville','fort worth','columbus','charlotte','san francisco','indianapolis','seattle','denver','washington',
    'boston','nashville','el paso','detroit','oklahoma city','portland','las vegas','memphis','louisville','baltimore',
    'milwaukee','albuquerque','tucson','fresno','sacramento','kansas city','mesa','atlanta','omaha','colorado springs',
    'raleigh','miami','london','paris','tokyo','sydney','berlin','madrid','barcelona'
  ];

  if (emailPattern.test(text)) return true;
  if (addressPattern.test(text)) return true;
  if (cityPattern.test(text)) return true;
  return knownCities.some((city) => normalized.includes(city));
}

function loadBlockedUsers() {
  try { return JSON.parse(localStorage.getItem('teamup_blocked_users') || '[]'); } catch (e) { return []; }
}

function saveBlockedUsers(users) {
  localStorage.setItem('teamup_blocked_users', JSON.stringify(users));
}

function isBlockedUser(name) {
  if (!name) return false;
  const normalized = name.trim().toLowerCase();
  return loadBlockedUsers().some((blocked) => blocked.toLowerCase() === normalized);
}

function blockUser(name) {
  if (!name) return;
  const blocked = loadBlockedUsers();
  const normalized = name.trim();
  if (!blocked.some((n) => n.toLowerCase() === normalized.toLowerCase())) {
    blocked.push(normalized);
    saveBlockedUsers(blocked);
  }
}

function deleteChat(chatId) {
  const chats = loadChats().filter((c) => c.id !== chatId);
  saveChats(chats);
  if (activeChatId === chatId && chatWindowElem) {
    chatWindowElem.style.display = 'none';
    activeChatId = null;
  }
  updateChatsUI();
}

function blockChatParticipant(chatId) {
  const chats = loadChats();
  const chat = chats.find((c) => c.id === chatId);
  if (!chat) return;
  const selfName = currentUser ? currentUser.displayName : (document.getElementById('author') && document.getElementById('author').value.trim()) || 'Guest';
  const blockedNames = chat.participants.filter((p) => p !== selfName);
  blockedNames.forEach(blockUser);
  deleteChat(chatId);
}

function disablePostSubmit(disabled) {
  const btn = document.querySelector('#post-form button[type="submit"]');
  if (btn) btn.disabled = !!disabled;
}
function disableAccountConnect(disabled) {
  // account connect removed — nothing to disable
  return;
}

function handleSubmit(event) {
  event.preventDefault();
  // profanity check for description and author
  const desc = document.getElementById('description').value || '';
  const authorField = document.getElementById('author').value || '';
  if (containsBadWord(desc)) {
    alert('Please remove inappropriate language from the description before posting.');
    return;
  }
  if (containsBadWord(authorField)) {
    alert('Please choose a different username. Inappropriate language is not allowed.');
    return;
  }
  const authorName = document.getElementById("author").value.trim() || (currentUser ? currentUser.displayName : "Anonymous");
  const newPost = {
    id: crypto.randomUUID(),
    game: document.getElementById("game").value,
    author: authorName,
    role: document.getElementById("role").value.trim() || "Any",
    age: parseInt(document.getElementById("age").value, 10) || null,
    platform: document.getElementById("platform").value.trim() || "Any",
    server: document.getElementById("server").value,
    gamemode: document.getElementById("gamemode").value,
    description: document.getElementById("description").value.trim(),
    createdAt: Date.now(),
    userId: currentUser ? currentUser.id : null,
  };

  const chosenRankElem = document.getElementById('rank');
  const chosenRank = chosenRankElem ? chosenRankElem.value : '';
  if (!chosenRank) {
    alert('Please select a rank for your post. Rank is required.');
    return;
  }
  if (chosenRank === 'none') {
    // user chose to post without a rank
    newPost.rank = null;
  } else {
    newPost.rank = chosenRank;
  }

  const posts = loadPosts();
  posts.unshift(newPost);
  savePosts(posts);
  postForm.reset();
  // after creating post, refresh rank filter lists to include new game's ranks
  updateRankFilterForGame(gameFilter.value);
  updatePostList();
}

function handleClearStorage() {
  if (!confirm("Clear all saved LFG posts? This cannot be undone.")) return;
  localStorage.removeItem(STORAGE_KEY);
  updatePostList();
}

postForm.addEventListener("submit", handleSubmit);
// when the game filter changes, update the rank-filter (game-specific) and refresh posts
gameFilter.addEventListener("change", () => {
  const selectedGame = gameFilter.value;
  if (selectedGame === 'all') {
    updateRankFilterForGame('all');
    updateGameModesForGame('');
  } else {
    if (gameSelect) gameSelect.value = selectedGame;
    updateRankFilterForGame(selectedGame);
    updateGameModesForGame(selectedGame);
  }
  updatePostList();
});
roleFilter.addEventListener("change", updatePostList);
// when the post form game selection changes, populate the post rank select for that specific game
if (gameSelect) {
  gameSelect.addEventListener('change', (e) => {
    console.log('Game selected:', e.target.value);
    updateRankFilterForGame(e.target.value);
    updateGameModesForGame(e.target.value);
  });
}
// account connect removed — no listener here
teamAgeFrom.addEventListener("input", () => {
  setCompatibilityMessage();
  updatePostList();
});
teamAgeTo.addEventListener("input", () => {
  setCompatibilityMessage();
  updatePostList();
});
// Team form: open/close overlay for profile editing
if (teamForm) teamForm.addEventListener("submit", handleTeamSubmit);
if (teamBackButton) teamBackButton.addEventListener("click", () => {
  localStorage.setItem('teamFormCompleted', 'false');
  if (teamOverlay) teamOverlay.style.display = 'none';
});
if (teamCloseButton) teamCloseButton.addEventListener("click", () => {
  if (teamOverlay) teamOverlay.style.display = 'none';
});
clearStorageButton.addEventListener("click", handleClearStorage);
serverButtons.forEach((button) => {
  button.addEventListener("click", () => {
    serverButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    updatePostList();
  });
});

// Input validation for profanity — description and usernames
const descriptionInput = document.getElementById('description');
const descriptionError = document.getElementById('description-error');
const authorInput = document.getElementById('author');
const usernameError = document.getElementById('username-error');
// account inputs removed
const accountNameInput = null;
const accountUsernameError = null;

function updateDescriptionValidation() {
  const text = descriptionInput ? descriptionInput.value : '';
  const bad = containsBadWord(text);
  if (descriptionError) descriptionError.style.display = bad ? 'block' : 'none';
  disablePostSubmit(bad);
}
function updateUsernameValidation() {
  const text = authorInput ? authorInput.value : '';
  const bad = containsBadWord(text);
  if (usernameError) usernameError.style.display = bad ? 'block' : 'none';
  // disable post submit if author invalid
  const descBad = descriptionInput && containsBadWord(descriptionInput.value);
  disablePostSubmit(bad || descBad);
}
if (descriptionInput) descriptionInput.addEventListener('input', updateDescriptionValidation);
if (authorInput) authorInput.addEventListener('input', updateUsernameValidation);

let activeChatId = null;


function updateRequestsUI() {
  if (!requestsListElem) return;
  const reqs = loadRequests().filter((r) => !isBlockedUser(r.from));
  requestsListElem.innerHTML = '';
  reqs.forEach(r => {
    const item = document.createElement('div');
    item.className = 'request-item';
    const meta = document.createElement('div');
    meta.className = 'request-meta';
    meta.innerHTML = `<strong>${r.from}</strong> wants to chat with <em>${r.to}</em><br/><small>${new Date(r.createdAt).toLocaleTimeString()}</small>`;
    const actions = document.createElement('div');
    actions.className = 'request-actions';
    if (r.status === 'pending') {
      const accept = document.createElement('button');
      accept.className = 'button button-primary';
      accept.textContent = 'Accept';
      accept.addEventListener('click', () => handleAcceptRequest(r.id));
      const decline = document.createElement('button');
      decline.className = 'button button-secondary';
      decline.textContent = 'Decline';
      decline.addEventListener('click', () => handleDeclineRequest(r.id));
      const block = document.createElement('button');
      block.className = 'button button-secondary';
      block.textContent = 'Block';
      block.addEventListener('click', () => {
        if (confirm(`Block ${r.from} from sending you requests?`)) {
          blockUser(r.from);
          const remaining = loadRequests().filter((x) => x.from !== r.from);
          saveRequests(remaining);
          updateRequestsUI();
          alert(`${r.from} is blocked.`);
        }
      });
      actions.appendChild(accept);
      actions.appendChild(decline);
      actions.appendChild(block);
    } else {
      const status = document.createElement('div');
      status.textContent = `Status: ${r.status}`;
      actions.appendChild(status);
    }
    item.appendChild(meta);
    item.appendChild(actions);
    requestsListElem.appendChild(item);
  });
  scheduleDeepPageTranslation();
}

function handleAcceptRequest(requestId) {
  const reqs = loadRequests();
  const r = reqs.find(x=>x.id===requestId);
  if (!r) return;
  if (isBlockedUser(r.from)) {
    alert(`${r.from} is blocked and cannot start a chat.`);
    const remaining = reqs.filter((x) => x.id !== requestId);
    saveRequests(remaining);
    updateRequestsUI();
    return;
  }
  r.status = 'accepted';
  saveRequests(reqs);
  // create chat
  const chats = loadChats();
  const chat = { id: crypto.randomUUID(), participants: [r.from, r.to], messages: [], createdAt: Date.now() };
  chats.unshift(chat);
  saveChats(chats);
  updateRequestsUI();
  updateChatsUI();
  openChat(chat.id);
}

function handleDeclineRequest(requestId) {
  const reqs = loadRequests();
  const r = reqs.find(x=>x.id===requestId);
  if (!r) return;
  r.status = 'declined';
  saveRequests(reqs);
  updateRequestsUI();
  alert('Request declined.');
}

function updateChatsUI() {
  if (!chatsListElem) return;
  const chats = loadChats().filter((c) => {
    const selfName = currentUser ? currentUser.displayName : (document.getElementById('author') && document.getElementById('author').value.trim()) || 'Guest';
    return !c.participants.some((p) => p !== selfName && isBlockedUser(p));
  });
  chatsListElem.innerHTML = '';
  chats.forEach(c => {
    const item = document.createElement('div');
    item.className = 'chat-item';
    const selfName = currentUser ? currentUser.displayName : (document.getElementById('author') && document.getElementById('author').value.trim()) || 'Guest';
    const others = c.participants.filter((p) => p !== selfName);
    const otherNames = others.length ? others.join(' & ') : c.participants.join(' & ');
    const body = document.createElement('div');
    body.innerHTML = `<div>${otherNames}<br/><small>${new Date(c.createdAt).toLocaleString()}</small></div>`;
    const actionGroup = document.createElement('div');
    actionGroup.className = 'chat-item-actions';
    const openButton = document.createElement('button');
    openButton.className = 'button button-primary';
    openButton.textContent = 'Open';
    openButton.addEventListener('click', (e) => { e.stopPropagation(); openChat(c.id); });
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'button button-secondary';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', (e) => { e.stopPropagation(); if (confirm('Delete this chat?')) deleteChat(c.id); });
    const blockBtn = document.createElement('button');
    blockBtn.className = 'button button-secondary';
    blockBtn.textContent = 'Block';
    blockBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (confirm(`Block ${otherNames} from contacting you?`)) {
        const blocked = others.length ? others : c.participants;
        blocked.forEach(blockUser);
        deleteChat(c.id);
        alert(`${otherNames} is blocked.`);
      }
    });
    actionGroup.appendChild(openButton);
    actionGroup.appendChild(deleteBtn);
    actionGroup.appendChild(blockBtn);
    item.appendChild(body);
    item.appendChild(actionGroup);
    item.addEventListener('click', () => openChat(c.id));
    chatsListElem.appendChild(item);
  });
  scheduleDeepPageTranslation();
}

function openChat(chatId) {
  activeChatId = chatId;
  const chats = loadChats();
  const c = chats.find(x=>x.id===chatId);
  if (!c) return;
  if (isMobileViewport()) {
    setMobileChatPanelOpen(true);
  }
  // show window
  if (chatWindowElem) chatWindowElem.style.display = 'flex';
  if (document.getElementById('chat-requests')) document.getElementById('chat-requests').style.display = 'none';
  if (document.getElementById('chat-list')) document.getElementById('chat-list').style.display = 'none';
  syncChatComposerState();
  updateChatMessages();
}

function updateChatMessages() {
  if (!chatMessagesElem || !activeChatId) return;
  const chats = loadChats();
  const c = chats.find(x=>x.id===activeChatId);
  if (!c) return;
  chatMessagesElem.innerHTML = '';
  c.messages.forEach(m => {
    const mEl = document.createElement('div');
    const activeAuthor = currentUser ? currentUser.displayName : (document.getElementById('author') && document.getElementById('author').value.trim()) || 'Guest';
    const isMe = m.from === activeAuthor;
    mEl.className = 'message ' + (isMe ? 'me' : 'them');
    if (m.text) mEl.innerHTML = `<div>${m.text}</div>`;
    if (m.gifUrl) mEl.innerHTML += `<img class="gif" src="${m.gifUrl}" alt="gif" />`;
    if (m.flagged) mEl.innerHTML += `<div class="flagged">Message flagged for inappropriate content</div>`;
    chatMessagesElem.appendChild(mEl);
  });
  // scroll to bottom
  chatMessagesElem.scrollTop = chatMessagesElem.scrollHeight;
}

function fillOneVOneMessage() {
  const username = getCurrentMessageUsername();
  if (!username) {
    alert('Log in with an account to use 1v1 messages.');
    return;
  }
  sendChatMessage(`1v1 me my user is ${username}`);
}

if (chatOneVOneBtn) chatOneVOneBtn.addEventListener('click', fillOneVOneMessage);

function sendChatMessage(rawText) {
  const username = getCurrentMessageUsername();
  if (!username) {
    alert('You need an account to send messages.');
    return false;
  }
  const text = (rawText || (chatTextInput ? chatTextInput.value : '')).trim();
  if (!activeChatId) return alert('Open a chat first');
  if (!text) return false;
  if (containsPersonalInfo(text)) {
    alert('Messages cannot include addresses, city names, or email addresses.');
    return false;
  }
  const flagged = containsBadWord(text);
  const chats = loadChats();
  const c = chats.find(x => x.id === activeChatId);
  if (!c) return false;
  const msg = { id: crypto.randomUUID(), from: username, text, timestamp: Date.now(), flagged: !!flagged };
  c.messages.push(msg);
  saveChats(chats);
  if (chatTextInput && !rawText) chatTextInput.value = '';
  updateChatMessages();
  if (flagged) alert('Your message was flagged for inappropriate language.');
  return true;
}

chatSendBtn && chatSendBtn.addEventListener('click', () => {
  sendChatMessage('');
});


// tab switching
const tabRequests = document.getElementById('tab-requests');
const tabChats = document.getElementById('tab-chats');
if (tabRequests) tabRequests.addEventListener('click', () => { document.getElementById('chat-requests').style.display='block'; document.getElementById('chat-list').style.display='none'; if (chatWindowElem) chatWindowElem.style.display='none'; tabRequests.classList.add('active'); tabChats.classList.remove('active'); });
if (tabChats) tabChats.addEventListener('click', () => { document.getElementById('chat-requests').style.display='none'; document.getElementById('chat-list').style.display='block'; if (chatWindowElem) chatWindowElem.style.display='none'; tabChats.classList.add('active'); tabRequests.classList.remove('active'); updateChatsUI(); });

updateRequestsUI();
updateChatsUI();

populateGameOptions();
updateTeamVisibility();
updatePostList();
updateOnlinePlayersPanel();

// Initialize auth and display
translationCache = loadTranslationCache();
initAuthFlow();
initSiteLanguageControl();
initMobileChatPanel();
