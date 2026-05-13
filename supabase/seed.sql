-- Insert seed data into posts table
TRUNCATE TABLE public.posts CASCADE;

insert into public.posts (title, excerpt, image_url, categories, created_at, content, author_name, author_avatar_url, read_time) values
(
  '리액트 커스텀 훅 예쁘게 가꾸기', 
  '마치 섬세한 정원을 가꾸듯, 재사용 가능한 리액트 훅을 구축하는 것은 세심한 주의와...', 
  '/images/react_hooks_garden.png', 
  ARRAY['Technology'], 
  '2024-10-12T10:00:00Z',
  '<p>For years, the digital design landscape has been dominated by austere minimalism. We stripped away gradients, flattened our shadows, and embraced a cold, utilitarian aesthetic. While this brought clarity, I argue we lost something vital in the process: the tactile warmth that makes digital spaces feel like cozy homes.</p><blockquote>"We don''t just want tools that work; we want tools that feel good to hold. A perfectly weighted digital button is the UI equivalent of a perfectly balanced chef''s knife."</blockquote><p>Enter <strong>Skeuomorphic-Lite</strong>, or as I like to call it, "Professional Whimsy." It''s not about rendering stitched leather or fake wood grain. It''s about reintroducing depth, soft lighting, and gentle physicality to our interfaces. Think pillowy surfaces, soft ambient shadows, and interactive elements that feel like they have a tiny bit of satisfying squish when clicked.</p><h3>🪴 Building the Tactile Button</h3><p>Let''s look at a practical example. Instead of a flat colored rectangle, we can use CSS to create a button that feels like a tangible key on a mechanical keyboard. Notice the use of a subtle border-bottom to create the illusion of physical thickness.</p><pre><code>.btn-tactile {
  background-color: var(--color-primary);
  color: var(--color-on-primary);
  border-radius: 0.5rem;
  padding: 8px 16px;

  /* The Magic: A darker bottom border creates ''thickness'' */
  border-bottom: 2px solid var(--color-surface-tint);

  transition: all 150ms ease;
}

.btn-tactile:active {
  /* Squish effect */
  transform: scale(0.95) translateY(2px);
  border-bottom-width: 0px;
}</code></pre><p>When you combine these tactile micro-interactions with a warm color palette—think creams, soft greens, and gentle yellows—you create an environment that lowers the user''s stress levels. It feels less like operating a machine and more like tending a small digital garden.</p><img src="/images/react_hooks_garden.png" alt="Tactile Keyboard Image" /><p>The next time you''re spinning up a new project, consider leaving the harsh, flat blacks and stark whites behind. Try adding a little bit of padding, a gentle shadow tinted with your primary brand color, and see how it transforms the feel of your application.</p>',
  'Arthur Pendelton',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Arthur',
  8
),
(
  '은은한 그림자와 CSS 디자인 아키텍처', 
  '거친 검은색에서 벗어나, 색이 가미된 부드러운 그림자의 따뜻함을 품어보세요...', 
  '/images/css_shadows_mug.png', 
  ARRAY['Technology'], 
  '2024-10-08T10:00:00Z',
  '<p>그림자는 깊이를 만들어내는 핵심 요소입니다. 기본적인 블랙 그림자 대신 색상이 은은하게 들어간 그림자를 사용하면 훨씬 부드럽고 따뜻한 인상을 줄 수 있습니다.</p>',
  '해탈한 개발자',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Dev',
  5
),
(
  '마을처럼 애플리케이션 상태 구조화하기', 
  '애플리케이션의 상태를 체계화하는 것은 혼란스러울 필요가 없습니다. 상태를 유기적인...', 
  '/images/arch_state.png', 
  ARRAY['Technology'], 
  '2024-10-01T10:00:00Z',
  '<p>상태 관리의 핵심은 적절한 계층 구조와 분리에 있습니다. 거대한 전역 상태 저장소를 만드는 대신 작은 마을처럼 지역 상태와 전역 상태를 적절히 조화롭게 배치해보세요.</p>',
  '해탈한 개발자',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Dev',
  6
),
(
  '초보자를 위한 타입스크립트 입문', 
  '안전하고 견고한 코드를 작성하기 위해 타입스크립트의 기본 개념과 활용법을 알아봅니다.', 
  '/images/ts_intro.png', 
  ARRAY['Lifestyle', 'Technology'], 
  '2024-09-25T10:00:00Z',
  '<p>타입스크립트는 자바스크립트의 슈퍼셋으로, 컴파일 단계에서 에러를 잡아내어 런타임 에러를 획기적으로 줄여줍니다. 초보자도 쉽게 따라할 수 있는 설정부터 기본 타입 정의까지 알아봅시다.</p>',
  '해탈한 개발자',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Dev',
  4
),
(
  '프론트엔드 성능 최적화 가이드', 
  '사용자 경험을 향상시키기 위해 렌더링 속도와 로딩 시간을 최적화하는 다양한 기법들...', 
  '/images/perf_guide.png', 
  ARRAY['Travel', 'Technology'], 
  '2024-09-18T10:00:00Z',
  '<p>웹 성능 최적화는 LCP, CLS, FID 등 코어 웹 바이탈을 중심으로 접근해야 합니다. 이미지 지연 로딩부터 코드 스플리팅까지 단계별 최적화 방안을 공유합니다.</p>',
  '해탈한 개발자',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Dev',
  7
),
(
  '디자인 시스템 구축의 첫 걸음', 
  '일관된 UI/UX를 제공하기 위한 디자인 시스템의 필요성과 초기 구축 단계의 핵심 요소...', 
  '/images/design_system.png', 
  ARRAY['Food', 'Lifestyle'], 
  '2024-09-10T10:00:00Z',
  '<p>디자인 시스템은 단순한 컴포넌트 라이브러리가 아닙니다. 디자이너와 개발자가 공통으로 사용하는 언어이자 원칙입니다. 컬러 팔레트부터 타이포그래피 규칙까지 디자인 시스템을 구축하는 방법을 소개합니다.</p>',
  '해탈한 개발자',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Dev',
  5
);
