/** @format */

import { ArrowLeft } from "lucide-react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { Footer } from "./Footer";
import { FramedPageShell } from "./FramedPageShell";
import { Seo } from "./Seo";

const OFFICE_IMG = new URL(
	"../../assets/9caf5948-a733-47de-9d1d-70809876d17e.jpg",
	import.meta.url,
).href;

const ITEMS_COUNT = 4;

const CONTENT_STRATEGY_ARTICLE = {
	intro:
		"Most businesses publish content. Very few publish content that actually drives results. The difference is a deliberate, data-backed content strategy built around conversion, not just traffic.",
	toc: [
		"What is a content strategy that converts?",
		"Why most content strategies fail",
		"The 6-step framework to build yours",
		"SEO best practices to amplify results",
		"How to measure content performance",
		"Frequently asked questions",
	],
	quickStats: [
		"3x more leads from content marketing vs. outbound",
		"62% less cost than traditional marketing",
		"70% of buyers research via content before purchasing",
	],
	commonFailures: [
		"Publishing without a defined audience persona or pain point",
		"Targeting keywords with traffic but no buyer intent",
		"No clear CTA mapped to each content piece",
		"Ignoring the middle and bottom of the funnel entirely",
		"Measuring vanity metrics (views, likes) instead of conversions",
		"Inconsistent publishing with no editorial rhythm",
	],
	steps: [
		{
			title: "Step 1: Define your buyer persona",
			body: "Understand who you are writing for: their goals, pain points, and the questions they search for at 2 a.m.",
		},
		{
			title: "Step 2: Map the buyer journey",
			body: "Create content for Awareness, Consideration, and Decision stages, not only top-of-funnel.",
		},
		{
			title: "Step 3: Do intent-based keyword research",
			body: 'Target keywords that signal buying intent, not just curiosity. Prioritize "best," "how to," and "vs" queries.',
		},
		{
			title: "Step 4: Build a content cluster architecture",
			body: "Use one pillar page plus supporting cluster posts. This signals topical authority to Google and keeps readers engaged.",
		},
		{
			title: "Step 5: Optimize every post for conversion",
			body: "Each post needs a clear CTA, internal links to offer pages, and trust elements such as stats, testimonials, and case studies.",
		},
		{
			title: "Step 6: Distribute and repurpose",
			body: "One article can become a LinkedIn post, email, short video, and carousel. Maximize reach without creating from scratch.",
		},
	],
	seoBestPractices: [
		"Use the primary keyword in the H1, first 100 words, and URL slug",
		"Target grade 7-9 reading level for accessibility and clarity",
		"Add structured data (FAQ schema, HowTo schema) for rich snippets",
		"Compress images and write descriptive alt text",
		"Match or exceed the top 3 ranking competitors on depth",
		"Refresh evergreen posts every 6-12 months",
		"Build backlinks through original data, expert quotes, and digital PR",
	],
	metrics: [
		"Conversion rate per post: percentage of visitors who take the desired action",
		"Assisted conversions: posts that appear before a sale in the journey",
		"Email opt-in rate: subscribers generated per 1,000 visitors",
		"Time on page and scroll depth: signals engagement and content quality",
		"Organic ranking trend: direction over time matters more than a single position",
		"Revenue attributed to content: the core business metric",
	],
	faq: [
		{
			question: "How long does it take to see results from a content strategy?",
			answer:
				"Usually 3-6 months for organic SEO results. Some high-intent posts in low-competition niches can rank sooner. Paid distribution and email promotion can accelerate early conversions while SEO compounds.",
		},
		{
			question: "How much content should I publish per month?",
			answer:
				"Consistency beats volume. Two well-researched, well-optimized posts per week often outperform daily thin content.",
		},
		{
			question: "Do I need a large team to execute a content strategy?",
			answer:
				"No. Many strong strategies are run by a strategist plus writer. Process matters more than headcount.",
		},
		{
			question:
				"What is the difference between content strategy and content marketing?",
			answer:
				'Content strategy is the plan (why, who, and what). Content marketing is execution (publishing and distribution).',
		},
	],
};

const CONTENT_STRATEGY_ARTICLE_AR = {
	intro:
		"معظم الشركات تنشر محتوى، لكن القليل فقط ينشر محتوى يحقق نتائج فعلية. الفرق الحقيقي هو وجود استراتيجية محتوى مدروسة ومبنية على البيانات وتركز على التحويل، وليس فقط الزيارات.",
	toc: [
		"ما هي استراتيجية المحتوى التي تحقق التحويل؟",
		"لماذا تفشل أغلب استراتيجيات المحتوى؟",
		"إطار عملي من 6 خطوات لبناء استراتيجيتك",
		"أفضل ممارسات SEO لتضخيم النتائج",
		"كيف تقيس أداء المحتوى بشكل صحيح",
		"الأسئلة الشائعة",
	],
	quickStats: [
		"التسويق بالمحتوى يحقق حتى 3 أضعاف العملاء المحتملين مقارنة بالأساليب التقليدية",
		"قد يقلل التكلفة التسويقية بنسبة تصل إلى 62%",
		"70% من المشترين يبحثون عبر المحتوى قبل الشراء",
	],
	commonFailures: [
		"النشر بدون شخصية جمهور واضحة أو مشكلة محددة",
		"استهداف كلمات تجلب زيارات دون نية شراء",
		"غياب دعوة إجراء واضحة داخل كل محتوى",
		"التركيز على أعلى القمع فقط وإهمال المراحل الأعمق",
		"قياس مؤشرات شكلية مثل المشاهدات بدل التحويلات",
		"عدم وجود إيقاع نشر ثابت وخطة تحرير واضحة",
	],
	steps: [
		{
			title: "الخطوة 1: عرّف شخصية العميل بدقة",
			body: "افهم جمهورك: أهدافه، تحدياته، والأسئلة التي يبحث عنها فعلاً.",
		},
		{
			title: "الخطوة 2: اربط المحتوى برحلة العميل",
			body: "اصنع محتوى لمراحل الوعي والاعتبار والقرار، وليس فقط التوعية.",
		},
		{
			title: "الخطوة 3: ابحث بالكلمات وفق نية المستخدم",
			body: "استهدف كلمات تدل على نية شراء، وليس الفضول فقط.",
		},
		{
			title: "الخطوة 4: ابنِ هيكل Pillar + Clusters",
			body: "صفحة رئيسية قوية مع مقالات داعمة مرتبطة داخلياً لتعزيز السلطة الموضوعية.",
		},
		{
			title: "الخطوة 5: حسّن كل مقال للتحويل",
			body: "ضع CTA واضحاً وروابط داخلية وعناصر ثقة مثل الأرقام والنتائج الحقيقية.",
		},
		{
			title: "الخطوة 6: وزّع المحتوى وأعد توظيفه",
			body: "حوّل المقال إلى منشورات وقصص وبريد وفيديو قصير لزيادة العائد من نفس الجهد.",
		},
	],
	seoBestPractices: [
		"ضع الكلمة الأساسية في العنوان H1 وأول 100 كلمة والرابط",
		"اكتب بلغة سهلة وواضحة لرفع الفهم والاحتفاظ",
		"استخدم FAQ وHowTo Schema لفرص الظهور المميز",
		"حسّن الصور والـ alt text",
		"قدّم عمقاً ينافس أفضل النتائج في البحث",
		"حدّث المقالات الدائمة كل 6-12 شهر",
		"ابنِ روابط خارجية عبر بيانات أصلية ومحتوى قيّم",
	],
	metrics: [
		"معدل التحويل لكل مقال",
		"التحويلات المساعدة ضمن رحلة العميل",
		"معدل الاشتراك بالبريد",
		"زمن القراءة وعمق التمرير",
		"اتجاه ترتيب الكلمات بمرور الوقت",
		"الإيراد المنسوب للمحتوى",
	],
	faq: [
		{
			question: "متى أبدأ برؤية نتائج استراتيجية المحتوى؟",
			answer:
				"عادة خلال 3-6 أشهر في SEO، وقد تظهر نتائج أسرع في الكلمات الأقل منافسة.",
		},
		{
			question: "كم مقال يجب نشره شهرياً؟",
			answer:
				"الاستمرارية أهم من الكمية. مقالان قويان أسبوعياً غالباً أفضل من محتوى يومي ضعيف.",
		},
		{
			question: "هل أحتاج فريقاً كبيراً؟",
			answer:
				"ليس بالضرورة. يمكن لفريق صغير مع عملية واضحة أن يحقق نتائج ممتازة.",
		},
		{
			question: "ما الفرق بين استراتيجية المحتوى والتسويق بالمحتوى؟",
			answer:
				"الاستراتيجية تحدد لماذا وماذا ولمن، والتسويق بالمحتوى هو التنفيذ والنشر والتوزيع.",
		},
	],
};

const DESIGN_SYSTEMS_ARTICLE = {
	intro:
		"Marketing teams waste hundreds of hours recreating assets from scratch: mismatched fonts, off-brand colors, and inconsistent button styles. A well-built design system removes this friction and helps teams move faster without sacrificing brand consistency.",
	toc: [
		"Why marketing teams need design systems",
		"The 5 core elements to standardize",
		"Components vs. guidelines: what's the difference?",
		"Common standardization mistakes",
		"How to roll it out across your team",
		"Call to action",
	],
	quickStats: [
		"Campaigns can launch up to 3x faster with strong design systems",
		"Higher brand recognition within 12 months of implementation",
		"Production time drops when reusable components replace ad-hoc design",
	],
	commonFailures: [
		"Over-documenting instead of building scannable, usable standards",
		"No clear owner to maintain and update the system",
		"Designing in a vacuum without team input",
		"Treating the system as a one-time project",
		"Standardizing everything and leaving no room for creativity",
	],
	steps: [
		{
			title: "Phase 1: Audit",
			body: "Collect all existing assets. Identify inconsistencies and the most-used components.",
		},
		{
			title: "Phase 2: Define",
			body: "Agree on core decisions like palette, typography, and key components. Get stakeholder sign-off.",
		},
		{
			title: "Phase 3: Build",
			body: "Create the Figma library, token files, and documentation hub. Start small and practical.",
		},
		{
			title: "Phase 4: Train",
			body: "Run workshops and show time-saving workflows so adoption feels easy, not enforced.",
		},
		{
			title: "Quick wins first",
			body: "Launch with the top 10 most-used assets standardized. Momentum matters more than completeness.",
		},
		{
			title: "Evolve continuously",
			body: "Update your system as your brand evolves to keep it relevant and trusted.",
		},
	],
	seoBestPractices: [
		"Document typography rules with exact sizes, weights, and line heights",
		"Define a tokenized color palette with canonical hex values",
		"Set logo clearspace and misuse examples to prevent brand drift",
		"Standardize image style with visual do/don't references",
		"Ship reusable UI components for common campaign patterns",
		"Pair every guideline with real component examples in the design library",
		"Keep docs lightweight, searchable, and connected to daily workflows",
	],
	metrics: [
		"Time-to-launch per campaign before vs. after system adoption",
		"Asset reusability rate across channels and teams",
		"Brand consistency score in design/QA reviews",
		"Design handoff revision rounds per campaign",
		"Adoption rate of approved templates and components",
		"Content production throughput without quality regression",
	],
	faq: [
		{
			question: "What should be standardized first?",
			answer:
				"Start with the highest-impact and most-repeated assets: typography, color tokens, logo usage, and top UI components.",
		},
		{
			question: "Do we need both guidelines and components?",
			answer:
				"Yes. Guidelines define the rules, and components are reusable implementations of those rules.",
		},
		{
			question: "How do we keep the system from going stale?",
			answer:
				"Assign clear ownership, establish review cycles, and include active contributors from marketing and design teams.",
		},
		{
			question: "How big should the first version be?",
			answer:
				"Keep V1 intentionally small and useful. A tight set of core standards outperforms a giant unused documentation set.",
		},
	],
};

const DESIGN_SYSTEMS_ARTICLE_AR = {
	intro:
		"فرق التسويق تهدر ساعات طويلة في إعادة تصميم الأصول من الصفر: خطوط غير متسقة، ألوان خارج الهوية، وأزرار مختلفة في كل حملة. نظام تصميم جيد يقلل الفوضى ويزيد سرعة التنفيذ مع الحفاظ على ثبات العلامة.",
	toc: [
		"لماذا تحتاج فرق التسويق إلى Design System؟",
		"ما العناصر الخمسة الأساسية التي يجب توحيدها؟",
		"ما الفرق بين المكونات والإرشادات؟",
		"أخطاء شائعة في التوحيد",
		"كيف تطبّق النظام داخل الفريق؟",
		"دعوة للبدء",
	],
	quickStats: [
		"الحملات قد تنطلق بسرعة تصل إلى 3x مع نظام تصميم قوي",
		"تحسن ملحوظ في تميّز العلامة خلال 12 شهراً",
		"تقليل وقت الإنتاج عبر الأصول القابلة لإعادة الاستخدام",
	],
	commonFailures: [
		"الإفراط في التوثيق بدل بناء نظام عملي",
		"غياب مالك واضح للنظام",
		"تصميم النظام بعيداً عن احتياجات الفرق",
		"اعتبار النظام مشروعاً مؤقتاً لا يتطور",
		"محاولة توحيد كل شيء ومنع المرونة الإبداعية",
	],
	steps: [
		{
			title: "المرحلة 1: المراجعة Audit",
			body: "اجمع الأصول الحالية وحدد الاختلافات والمكونات الأكثر تكراراً.",
		},
		{
			title: "المرحلة 2: التعريف Define",
			body: "اتفق على القرارات الأساسية: الألوان، الخطوط، والمكونات المحورية.",
		},
		{
			title: "المرحلة 3: البناء Build",
			body: "أنشئ مكتبة Figma، والـ tokens، ومركز التوثيق. ابدأ صغيراً وعملياً.",
		},
		{
			title: "المرحلة 4: التدريب Train",
			body: "نفّذ ورش عمل تُظهر كيف يوفّر النظام الوقت ويُسهّل العمل اليومي.",
		},
		{
			title: "ابدأ بمكاسب سريعة",
			body: "وحّد أهم 10 أصول مستخدمة أولاً لبناء زخم اعتماد داخلي.",
		},
		{
			title: "طوّر النظام باستمرار",
			body: "حدّث النظام مع تطور الهوية واحتياجات الحملات.",
		},
	],
	seoBestPractices: [
		"وثّق قواعد Typography بأحجام وأوزان واضحة",
		"عرّف Color Tokens دقيقة ومعتمدة",
		"حدد قواعد استخدام الشعار والأخطاء الممنوعة",
		"وحّد أسلوب الصور والأمثلة الصحيحة والخاطئة",
		"وفّر مكونات جاهزة للحملات المتكررة",
		"اربط كل Guideline بمكوّن فعلي داخل المكتبة",
		"اجعل التوثيق قصيراً وقابلاً للبحث وسهل التطبيق",
	],
	metrics: [
		"زمن إطلاق الحملة قبل وبعد النظام",
		"نسبة إعادة استخدام الأصول بين الفرق",
		"مستوى الاتساق البصري في مراجعات الجودة",
		"عدد جولات التعديل قبل الإطلاق",
		"نسبة تبنّي القوالب والمكونات المعتمدة",
		"زيادة الإنتاجية دون تراجع الجودة",
	],
	faq: [
		{
			question: "ما أول ما يجب توحيده؟",
			answer:
				"ابدأ بالعناصر الأكثر تأثيراً وتكراراً: الخطوط، الألوان، الشعار، والمكونات الأساسية.",
		},
		{
			question: "هل نحتاج Guidelines وComponents معاً؟",
			answer: "نعم. الإرشادات تحدد القواعد، والمكونات تطبقها بشكل جاهز وقابل لإعادة الاستخدام.",
		},
		{
			question: "كيف نمنع النظام من أن يصبح قديماً؟",
			answer: "بتعيين مسؤول واضح ومراجعات دورية وتعاون مستمر مع الفرق المستخدمة.",
		},
		{
			question: "ما حجم النسخة الأولى؟",
			answer: "نسخة صغيرة عملية أفضل من نظام ضخم لا يستخدمه أحد.",
		},
	],
};

const DESIGN_SYSTEMS_FAQ_ARTICLE = {
	intro:
		"The most searched questions around marketing design systems are often the same blockers teams face during adoption. This FAQ section answers them in a practical, implementation-first way so teams can standardize faster and avoid common rollout mistakes.",
	toc: [
		"What is a design system for marketing teams?",
		"What should be standardized in a marketing design system?",
		"How is a design system different from a brand style guide?",
		"How long does it take to build a marketing design system?",
		"What tools do marketing teams use?",
		"How do you drive team adoption?",
	],
	quickStats: [
		"Design systems can reduce design production time by up to 50%",
		"Figma + Notion can cover around 80% of team operational needs",
		"Training workshops can increase adoption by up to 3x",
	],
	commonFailures: [
		"Building rules without reusable components teams can apply immediately",
		"Launching too big instead of starting with a focused v1",
		"No ownership model for updates, maintenance, and governance",
		"Skipping enablement and expecting adoption to happen automatically",
		"Not aligning system decisions with day-to-day campaign workflows",
	],
	steps: [
		{
			title: "What is a design system for marketing teams?",
			body: "A shared library of reusable assets, rules, and guidelines that keeps ads, emails, landing pages, and social content consistent with your brand.",
		},
		{
			title: "What should be standardized first?",
			body: "Start with typography, color palette, logo usage, image style, and high-frequency UI components such as CTAs, forms, and ad templates.",
		},
		{
			title: "Design system vs. style guide",
			body: "A style guide explains rules; a design system operationalizes them through reusable approved assets. You need both.",
		},
		{
			title: "How long does setup take?",
			body: "Small teams can launch a practical v1 in 2-4 weeks, mid-size teams in 4-8 weeks, while enterprise programs may take 3-6 months.",
		},
		{
			title: "Which tools should teams use?",
			body: "Most teams succeed with Figma for components plus Notion/Confluence for documentation. Storybook, Zeroheight, or Supernova can be added as needed.",
		},
		{
			title: "How to make adoption stick",
			body: "Involve teams early, prove time savings, assign ownership, and make system usage easier than creating assets from scratch.",
		},
	],
	seoBestPractices: [
		"Structure FAQ content using concise question-first headings",
		"Include implementation-ready answers, not only definitions",
		"Add FAQ schema markup to increase rich-result eligibility",
		"Keep answers scannable with bullets and clear action points",
		"Use intent-aligned language matching real search queries",
		"Refresh high-performing FAQs based on new team questions",
	],
	metrics: [
		"FAQ organic impressions and click-through rate over time",
		"Rich snippet and People Also Ask appearance frequency",
		"Time-to-answer for internal team onboarding questions",
		"Reduction in repeated brand/asset clarification requests",
		"Template and component adoption after FAQ publication",
		"Content production speed and quality consistency post rollout",
	],
	faq: [
		{
			question: "What is a design system for marketing teams?",
			answer:
				"It is a shared source of truth for visual and verbal brand decisions, plus reusable components teams use daily across channels.",
		},
		{
			question: "What should be standardized in a marketing design system?",
			answer:
				"Standardize typography, palette, logo rules, image style, and reusable UI elements first. Focus on the top 10 most-reused assets.",
		},
		{
			question: "How is a design system different from a brand style guide?",
			answer:
				"A style guide is static documentation. A design system is a living toolkit with pre-built assets that enforce those rules in real work.",
		},
		{
			question: "How do you get teams to adopt it?",
			answer:
				"Co-create it with users, run training, assign a clear owner, and prove that using the system saves time on real campaigns.",
		},
	],
};

const DESIGN_SYSTEMS_FAQ_ARTICLE_AR = {
	intro:
		"أكثر الأسئلة بحثاً حول أنظمة التصميم التسويقية غالباً هي نفس التحديات التي تعطل التنفيذ داخل الفرق. هذا الدليل يقدّم إجابات عملية تساعدك على التطبيق السريع.",
	toc: [
		"ما هو Design System لفرق التسويق؟",
		"ما الذي يجب توحيده أولاً؟",
		"ما الفرق بين Design System وBrand Guide؟",
		"كم يستغرق بناء النظام؟",
		"ما الأدوات المناسبة لإدارته؟",
		"كيف نضمن تبنّي الفريق له؟",
	],
	quickStats: [
		"قد يقل وقت الإنتاج التصميمي حتى 50%",
		"Figma + Notion يغطيان احتياج أغلب الفرق",
		"ورش التدريب قد ترفع الاعتماد حتى 3x",
	],
	commonFailures: [
		"توثيق القواعد دون توفير مكونات جاهزة",
		"إطلاق كبير ومعقد بدلاً من نسخة أولى مركزة",
		"غياب الحوكمة والمسؤولية الواضحة",
		"التوقع أن الاعتماد يحدث تلقائياً بدون تدريب",
		"عدم مواءمة النظام مع طريقة عمل الفريق اليومية",
	],
	steps: [
		{
			title: "ما هو Design System للتسويق؟",
			body: "مصدر موحد للهوية البصرية واللفظية مع أصول قابلة لإعادة الاستخدام عبر القنوات.",
		},
		{
			title: "ما الذي نوحّده أولاً؟",
			body: "Typography، الألوان، قواعد الشعار، أسلوب الصور، ومكونات UI المتكررة.",
		},
		{
			title: "Design System أم Style Guide؟",
			body: "الـ Style Guide يشرح القواعد، والـ Design System يقدّم تطبيقاً جاهزاً لتلك القواعد.",
		},
		{
			title: "المدة المتوقعة للبناء",
			body: "فرق صغيرة: 2-4 أسابيع، متوسطة: 4-8 أسابيع، ومؤسسات كبيرة: 3-6 أشهر.",
		},
		{
			title: "أفضل الأدوات",
			body: "Figma للمكونات + Notion/Confluence للتوثيق، مع أدوات متقدمة حسب الحاجة.",
		},
		{
			title: "رفع معدل التبني",
			body: "أشرك الفريق مبكراً، أثبت توفير الوقت، وعيّن مالكاً واضحاً للنظام.",
		},
	],
	seoBestPractices: [
		"استخدم صياغة سؤال/جواب واضحة وقصيرة",
		"قدّم إجابات قابلة للتنفيذ وليست تعريفات عامة فقط",
		"أضف FAQ Schema لتحسين فرص الظهور المميز",
		"قسّم الإجابات إلى نقاط سهلة المسح",
		"استخدم كلمات توافق نية البحث الحقيقية",
		"حدّث الأسئلة باستمرار وفق أسئلة الفريق الجديدة",
	],
	metrics: [
		"مرات الظهور والنقر لصفحات FAQ",
		"معدل الظهور في Rich Snippets وPeople Also Ask",
		"خفض وقت الرد على أسئلة الفرق الداخلية",
		"انخفاض الاستفسارات المتكررة حول الأصول والهوية",
		"نسبة استخدام القوالب والمكونات بعد نشر FAQ",
		"تحسن سرعة الإنتاج مع الحفاظ على الجودة",
	],
	faq: [
		{
			question: "ما هو نظام التصميم لفرق التسويق؟",
			answer:
				"هو مرجع موحد للقواعد والأصول والمكونات التي تضمن اتساق المحتوى عبر كل القنوات.",
		},
		{
			question: "ما العناصر التي يجب توحيدها أولاً؟",
			answer:
				"ابدأ بأكثر الأصول استخداماً: الخطوط، الألوان، الشعار، وقوالب المكونات الأساسية.",
		},
		{
			question: "ما الفرق بينه وبين دليل الهوية؟",
			answer:
				"دليل الهوية يشرح القواعد، أما نظام التصميم فيقدم أدوات جاهزة تطبق هذه القواعد مباشرة.",
		},
		{
			question: "كيف نضمن اعتماد الفريق؟",
			answer:
				"بالمشاركة المبكرة، التدريب، الملكية الواضحة، وجعل استخدام النظام أسرع من البدائل.",
		},
	],
};

type ShoroukStat = { label: string; value: string };
type ShoroukTrigger = { title: string; body: string };

type ShoroukArticleSlice = {
	anchor: string;
	category: string;
	title: string;
	metaLine: string;
	intro: string;
	stats: ShoroukStat[];
	triggersHeading?: string;
	triggers?: ShoroukTrigger[];
	whyHeading?: string;
	whyBody?: string;
	winHeading?: string;
	winBody?: string;
	stepsHeading?: string;
	steps?: ShoroukTrigger[];
	pickHeading?: string;
	pickBody?: string;
	formulaHeading?: string;
	formulaLead?: string;
	platformsHeading?: string;
	platforms?: ShoroukTrigger[];
	checklistHeading?: string;
	checklist?: string[];
	ctaNote?: string;
};

const SHOROUK_ARTICLES_EN: ShoroukArticleSlice[] = [
	{
		anchor: "shorouk-consumer-psychology",
		category: "Consumer Psychology",
		title: "The Hidden Triggers That Make People Buy Without Thinking",
		metaLine: "Shorouk Omar · Apr 30, 2026 · 7 min read · Article 01",
		intro:
			"95% of purchasing decisions happen in the subconscious mind. Here's how leading brands leverage cognitive biases — and how you can apply the same ideas ethically.",
		stats: [
			{ value: "95%", label: "Subconscious decisions" },
			{ value: "3×", label: "Higher conversions" },
			{ value: "47s", label: "Avg. attention span" },
		],
		triggersHeading: "The 4 core bias triggers",
		triggers: [
			{
				title: "Loss Aversion",
				body: "People fear losing $50 about twice as much as gaining it. Frame offers around what they'll miss — not only what they'll gain.",
			},
			{
				title: "Social Proof",
				body: "We look to others to validate choices. Ratings, reviews, and “people bought this” signals reduce perceived risk.",
			},
			{
				title: "Scarcity Effect",
				body: `"Only a few left" creates urgency. Scarcity signals value and taps into FOMO-driven action.`,
			},
			{
				title: "Reciprocity",
				body: "Give first — a guide, trial, or useful content — and people feel a natural urge to reciprocate.",
			},
		],
		whyHeading: "Why this matters for your brand",
		whyBody:
			"Understanding biases is not manipulation — it's meeting your audience where their minds already operate. Align messaging with how people naturally evaluate choices, reduce friction, and build trust.",
		winHeading: "Quick win for your next campaign",
		winBody:
			"Replace \"Get 20% off\" with \"Don't miss your 20% savings — offer ends Friday.\" Loss-framed CTAs often beat gain-framed ones by roughly 15–30% in A/B tests.",
	},
	{
		anchor: "shorouk-content-strategy",
		category: "Content Strategy",
		title:
			"Why 90% of Content Gets Zero Traffic — And How to Be in the Other 10%",
		metaLine: "Shorouk Omar · Apr 30, 2026 · 6 min read · Article 02",
		intro:
			"Most brands publish content nobody asked for. Here is the framework that flips that — and moves your blog toward real lead generation.",
		stats: [
			{ value: "90%", label: "Content gets no meaningful traffic" },
			{ value: "3×", label: "ROI when strategy leads" },
			{ value: "~6 mo", label: "Typical runway to traction" },
		],
		stepsHeading: "The 4-step framework",
		steps: [
			{
				title: "1. Start with search intent, not random topics",
				body: "Use Ahrefs or SEMrush to align with queries people actually search. Content that answers real questions tends to rank; purely “creative” ideas often don't.",
			},
			{
				title: "2. Build topic clusters, not one-off posts",
				body: "One strong pillar (~2k+ words) plus 8–12 cluster posts earns topical authority. Depth usually beats scattering thin articles.",
			},
			{
				title: "3. Repurpose across every channel",
				body: "One blog becomes a carousel, reel, newsletter, podcast angle — maximize reach without starting from scratch every time.",
			},
			{
				title: "4. Measure what actually matters",
				body: "Vanity metrics mislead. Watch time-on-page, scroll depth, and leads attributable to each piece.",
			},
		],
		pickHeading: "Pick: Skyscraper technique",
		pickBody:
			"Find top-ranking content for your keyword, make yours meaningfully richer (data, structure, examples), then reach out to sites linking to the original. Teams often see backlinks multiply within ~90 days when execution is disciplined.",
	},
	{
		anchor: "shorouk-viral-formula",
		category: "Social Media Marketing",
		title: "The Viral Content Formula Nobody Talks About",
		metaLine: "Shorouk Omar · Apr 30, 2026 · 5 min read · Article 03",
		intro:
			"Viral outcomes are rarely random. Patterns show up repeatedly across tens of thousands of posts — here's what differentiated accounts do.",
		stats: [
			{ value: "Hook +", label: "Emotion + clarity" },
			{ value: "1 idea", label: "Per post" },
			{ value: "Hour 1", label: "Engagement spike window" },
		],
		formulaHeading: "Shorouk Omar's formula",
		formulaLead: "Strong hook + Emotional trigger + Clear value = standout post.",
		platformsHeading: "Platform snapshots",
		platforms: [
			{
				title: "LinkedIn — B2B",
				body: "Post Tues–Thu, roughly 7–9 AM. Stories usually outperform announcements; close with a question to drive comments.",
			},
			{
				title: "Instagram — Visual-first",
				body: "Reels commonly reach farther than still posts. Nail the opening 3 seconds before people scroll.",
			},
			{
				title: "X — Conversation",
				body: "Threads often beat singles. Opinion + data earns replies; nurture the thread.",
			},
			{
				title: "TikTok — Fast reach",
				body: "Authenticity beats over-polish. Trending audio can help; momentum often favors daily cadence early on.",
			},
		],
		checklistHeading: "Non-negotiable checklist",
		checklist: [
			"Hook in the first beat — opening line stops the scroll.",
			"One idea per asset — breadth dilutes resonance.",
			"Build an obvious share cue (tag, save, send to a teammate).",
			"Stay active in replies during the first hour after posting.",
		],
		ctaNote:
			"Want a 30-day calendar mapped to your brand? Start by applying one article's framework weekly — psychology, intentional content, then distribution discipline.",
	},
];

const SHOROUK_ARTICLES_AR: ShoroukArticleSlice[] = [
	{
		anchor: "shorouk-consumer-psychology",
		category: "علم النفس الاستهلاكي",
		title:
			"العوامل الخفية التي تجعل الناس يشترون دون أن يدركوا ذلك بالكامل",
		metaLine: "شروق عمر · 30 أبريل 2026 · 7 دقائق قراءة · المقال 01",
		intro:
			"تُتخذ نحو 95٪ من قرارات الشراء في العقل اللاواعي. هكذا تستخدم العلامات القوى الاستدلالية المعرفية بطريقة أخلاقية — ويمكنك أنت ذلك أيضاً.",
		stats: [
			{ value: "95%", label: "قرارات لاواعية" },
			{ value: "٣×", label: "تحويل أعلى" },
			{ value: "٤٧ ث", label: "متوسط مدة انتباه" },
		],
		triggersHeading: "أربعة محفزات انحياز أساسية",
		triggers: [
			{
				title: "تجنّب الخسارة",
				body: "الناس يخافون من خسارة مبلغ بقدر أكبر تقريباً مما يفرحون بربح مثله. اصاغ العروض على ما سيضيعون إذا لم يتصرفوا — لا المكسب فقط.",
			},
			{
				title: "الدليل الاجتماعي",
				body: "ننظر إلى الآخرين لنتأكد. التقييمات والمراجعات وإشارات «اشتراه آخرون» تخفّف الإحساس بالمخاطرة.",
			},
			{
				title: "ندرة",
				body: "عبارات مثل «تبقى القليل» تخلق استعجالاً؛ الندرة تشير إلى قيمة وتحرّك مخاوف الفوات.",
			},
			{
				title: "المقابلة بالجميل",
				body: "قدّم قيمة أولاً — دليل، تجربة محتوى مفيد — فيشعر الجمهور بند طبيعي للرد بالتفاعل أو الشراء.",
			},
		],
		whyHeading: "لمَ يهم ذلك علامتك؟",
		whyBody:
			"فهم الانحيازات ليس مراوغة؛ إنه التقاء مع طريقة تفكير الجمهور. عندما تنسجم رسالتك مع كيف يقرّر الناس عملياً، تقل الاحتكاك وتقوى الثقة.",
		winHeading: "فوز سريع لحملتك القادمة",
		winBody:
			"جرّب استبدال «احصل على خصم 20٪» بـ «لا تفوت توفير 20٪ — ينتهي الجمعة». صياغة الخسارة غالباً تتفوق بـ ١٥–٣٠٪ في تجارب A/B لترويسات البريد.",
	},
	{
		anchor: "shorouk-content-strategy",
		category: "استراتيجية المحتوى",
		title:
			"لماذا يحقق تسعين بالمئة من المحتوى صفر زيارات — وكيف تكون ضمن الباقين؟",
		metaLine: "شروق عمر · 30 أبريل 2026 · 6 دقائق قراءة · المقال 02",
		intro:
			"كثير من العلامات ينشرون ما لم يطلب أحد بحثاً عنه. هذا الإطار يعكس المعادلة ويوجه مدونتك نحو توليد عملاء حقيقيين.",
		stats: [
			{ value: "90%", label: "محتوى بلا صدى يذكر" },
			{ value: "٣×", label: "عائد أعلى عندما تسبق الخطة الإبداعة" },
			{ value: "~٦ شهور", label: "مدى زمني واقعي للنتائج" },
		],
		stepsHeading: "إطار من أربع خطوات",
		steps: [
			{
				title: "١. ابنِ الفكرة على نية البحث وليس عنواناً عشوائياً",
				body: "استخدم Ahrefs أو SEMrush لمعرفة ما يبحثه الجمهور فعلياً. المحتوى الذي يجيب على أسئلة حقيقية أقرب إلى الترتيب.",
			},
			{
				title: "٢. كتل موضوعات لا مقالات متفرقة",
				body: "عمود رئيسي (~٢٠٠٠+ كلمة) مع ٨–١٢ مقالاً فرعياً يبني سلطة موضوعية. العمق عادة أفضل من الانتشار الضيق.",
			},
			{
				title: "٣. أعد توظيف المحتوى عبر كل قناة",
				body: "مقال واحد يصبح كاروسيل وريلاً وبودكاست واختصارات بريد — أقصى وصول مع أقل تكرار من الصفر.",
			},
			{
				title: "٤. القِس ما يهم",
				body: "مشاهدات الصفحة تخدع. راقب زمن الصفحة وعمق التمرير والعملاء المحتملين المنسبين لكل مقال.",
			},
		],
		pickHeading: "توصيتي: تقنية الناطحة السحابية",
		pickBody:
			"اعثر على المحتوى الأعلى تصنيفاً لكلمة بحث هدفك، ثم طور نسختك بتفوق واضطهاد (بيانات، أمثلة، تجربة). تواصل مع المواقع التي تربط الأصل؛ التنفيذ الجيد غالباً يضاعف روابط backlinks خلال حوالي ٩٠ يوماً.",
	},
	{
		anchor: "shorouk-viral-formula",
		category: "التسويق عبر وسائل التواصل",
		title:
			"صياغة المحتوى الفيروسي التي لا يتحدّث عنها الجميع",
		metaLine: "شروق عمر · 30 أبريل 2026 · 5 دقائق قراءة · المقال 03",
		intro:
			"الانتشار الواسع ليس ضربة حظ وحسب. بعد تحليل عشرات آلاف المنشورات، تكرّس أنماط واضحة لما يميّز الحسابات الأفضل.",
		stats: [
			{ value: "خطاف+", label: "مشاعر + قيمة واضحة" },
			{ value: "فكرة", label: "واحدة لكل منشور" },
			{ value: "ساعة ١", label: "نافذة التفاعل الحرجة" },
		],
		formulaHeading: "صيغة شروق عمر",
		formulaLead: "خطاف قوي + محفّز عاطفي + قيمة واضحة = منشور يبرز.",
		platformsHeading: "لمحة وفق المنصة",
		platforms: [
			{
				title: "لينكدإن",
				body: "يُشاع النشر بين الثُّلثاء والخميس حوالي صباحاً. القصص غالباً تتفوق على أخبار الشركة؛ أيّده بسؤال لزيادة التعليقات.",
			},
			{
				title: "إنستغرام",
				body: "الريلس غالباً يصل أكثر من الصورة الثابتة. احسم أول ثلاث ثوانٍ قبل التمرير.",
			},
			{
				title: "إكس (تويتر)",
				body: "سلسلة التغريدات غالباً تتفوق على التغريدة الواحدة. عبِّر عن رأي واضح مع رقم؛ تابع النقاش ضمن الخيط.",
			},
			{
				title: "تيك توك",
				body: "الصدق يضرب التزييف. الصوت أو الترند قد يدفِّع؛ الانتظام في أول ٣٠ يوماً مهّد شائعاً.",
			},
		],
		checklistHeading: "قائمة لا تُستهان بها",
		checklist: [
			"الخطّاف في الذروة الأولى من السطر الافتتاحي يوقف التمرير.",
			"فكرة واحدة لكل أصل؛ محاولة قول كل شيء لا تصل لأحد.",
			"أضِف دفعاً مشاركة واضحاً (وسم، احفاظ، أو أرسل لزميل).",
			"تفاعل مع التعليقات في الساعة الأولى بعد النشر.",
		],
		ctaNote:
			"هل تريد تقويم محتوى ٣٠ يوماً وفق هويتك؟ طبّق أسبوعياً عموداً: علم قرار، ثم محتوى قصدياً، ثم الانضباط في النشر والتوزيع.",
	},
];

function ShoroukCollectionBody({
	isArabic,
	articles,
}: {
	isArabic: boolean;
	articles: ShoroukArticleSlice[];
}) {
	const tocIntro = isArabic
		? "ثلاث مقالات عملية لشروق عمر لوكالة Marketly عن علم نفس الشراء، استراتيجية المحتوى، وفيرالية السوشال."
		: "Three practical essays by Shorouk Omar around buying psychology, content strategy, and social distribution.";

	const statLabelIntro = isArabic ? "نظرة سريعة" : "Snapshot";

	return (
		<div className='mt-10 border-t border-dividerOnLight pt-10 lg:grid lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-10'>
			<aside className='mb-8 lg:mb-0'>
				<div className='rounded-2xl border border-dividerOnLight bg-cream/40 p-5 lg:sticky lg:top-24'>
					<p className='font-manrope text-xs font-semibold uppercase tracking-[0.12em] text-textSecondary'>
						{isArabic ? "في هذه الصفحة" : "On this page"}
					</p>
					<nav aria-label={isArabic ? "جدول المحتوى" : "Table of contents"}>
						<ol className='mt-3 list-decimal space-y-2 ps-5 font-manrope text-sm text-textSecondary'>
							{articles.map((article) => (
								<li key={article.anchor}>
									<a
										className='text-brand underline-offset-2 hover:underline'
										href={`#${article.anchor}`}>
										{article.title}
									</a>
								</li>
							))}
						</ol>
					</nav>
				</div>
			</aside>

			<div className='space-y-14'>
				<section className='rounded-2xl border border-dividerOnLight bg-brand/5 p-6'>
					<p className='font-manrope text-base leading-relaxed text-textPrimary md:text-lg'>
						{tocIntro}
					</p>
				</section>

				{articles.map((article) => (
					<section
						key={article.anchor}
						id={article.anchor}
						className='scroll-mt-24 space-y-6 rounded-3xl border border-dividerOnLight bg-surface p-6 shadow-sm md:p-8'>
						<div>
							<p className='inline-flex rounded-full bg-brand/10 px-3 py-1 font-manrope text-xs font-semibold uppercase tracking-[0.12em] text-brand'>
								{article.category}
							</p>
							<h2 className='mt-4 font-raleway text-2xl font-semibold tracking-tight text-textPrimary md:text-3xl'>
								{article.title}
							</h2>
							<p className='mt-2 font-manrope text-sm text-textSecondary'>
								{article.metaLine}
							</p>
							<p className='mt-4 font-manrope text-base leading-relaxed text-textSecondary md:text-lg'>
								{article.intro}
							</p>
						</div>

						<div>
							<p className='font-manrope text-xs font-semibold uppercase tracking-[0.12em] text-textSecondary'>
								{statLabelIntro}
							</p>
							<ul className='mt-3 grid gap-3 sm:grid-cols-3'>
								{article.stats.map((stat) => (
									<li
										key={`${article.anchor}-${stat.label}`}
										className='rounded-2xl border border-brand/20 bg-gradient-to-b from-brand/10 to-brand/5 px-4 py-4 text-center shadow-sm'>
										<span className='font-raleway text-2xl font-semibold text-textPrimary'>
											{stat.value}
										</span>
										<p className='mt-1 font-manrope text-xs font-medium text-textSecondary md:text-sm'>
											{stat.label}
										</p>
									</li>
								))}
							</ul>
						</div>

						{article.triggers?.length ? (
							<div>
								<h3 className='font-raleway text-xl font-semibold text-textPrimary'>
									{article.triggersHeading}
								</h3>
								<div className='mt-4 grid gap-4 md:grid-cols-2'>
									{article.triggers.map((item) => (
										<div
											key={item.title}
											className='rounded-2xl border border-dividerOnLight bg-cream/30 p-4'>
											<p className='font-raleway text-base font-semibold text-textPrimary'>
												{item.title}
											</p>
											<p className='mt-2 font-manrope text-sm leading-relaxed text-textSecondary'>
												{item.body}
											</p>
										</div>
									))}
								</div>
								{article.whyBody ? (
									<>
										<h3 className='mt-8 font-raleway text-xl font-semibold text-textPrimary'>
											{article.whyHeading}
										</h3>
										<p className='mt-3 font-manrope text-sm leading-relaxed text-textSecondary md:text-base'>
											{article.whyBody}
										</p>
									</>
								) : null}
								{article.winBody ? (
									<div className='rounded-2xl border border-brand/25 bg-brand/5 p-5'>
										<p className='font-manrope text-sm font-semibold text-textPrimary'>
											{article.winHeading}
										</p>
										<p className='mt-2 font-manrope text-sm leading-relaxed text-textSecondary md:text-base'>
											{article.winBody}
										</p>
									</div>
								) : null}
							</div>
						) : null}

						{article.steps?.length ? (
							<div>
								<h3 className='font-raleway text-xl font-semibold text-textPrimary'>
									{article.stepsHeading}
								</h3>
								<div className='mt-4 grid gap-4 md:grid-cols-2'>
									{article.steps.map((step) => (
										<article
											key={step.title}
											className='rounded-2xl border border-dividerOnLight bg-surface p-4 shadow-sm'>
											<p className='font-manrope text-sm font-semibold text-textPrimary'>
												{step.title}
											</p>
											<p className='mt-2 font-manrope text-sm leading-relaxed text-textSecondary'>
												{step.body}
											</p>
										</article>
									))}
								</div>
								{article.pickBody ? (
									<div className='mt-6 rounded-2xl border border-dividerOnLight bg-cream/40 p-5'>
										<p className='font-manrope text-sm font-semibold text-textPrimary'>
											{article.pickHeading}
										</p>
										<p className='mt-2 font-manrope text-sm leading-relaxed text-textSecondary md:text-base'>
											{article.pickBody}
										</p>
									</div>
								) : null}
							</div>
						) : null}

						{article.formulaLead ? (
							<div className='space-y-6'>
								<div>
									<h3 className='font-raleway text-xl font-semibold text-textPrimary'>
										{article.formulaHeading}
									</h3>
									<p className='mt-3 rounded-2xl border border-brand/20 bg-brand/10 p-5 font-manrope text-base font-medium text-textPrimary md:text-lg'>
										{article.formulaLead}
									</p>
								</div>
								{article.platforms?.length ? (
									<div>
										<h3 className='font-raleway text-xl font-semibold text-textPrimary'>
											{article.platformsHeading}
										</h3>
										<ul className='mt-4 space-y-3'>
											{article.platforms.map((p) => (
												<li
													key={p.title}
													className='rounded-2xl border border-dividerOnLight px-4 py-3'>
													<p className='font-manrope text-sm font-semibold text-textPrimary'>
														{p.title}
													</p>
													<p className='mt-2 font-manrope text-sm leading-relaxed text-textSecondary'>
														{p.body}
													</p>
												</li>
											))}
										</ul>
									</div>
								) : null}
								{article.checklist?.length ? (
									<div>
										<h3 className='font-raleway text-xl font-semibold text-textPrimary'>
											{article.checklistHeading}
										</h3>
										<ul className='mt-3 list-disc space-y-2 ps-5 font-manrope text-sm leading-relaxed text-textSecondary md:text-base'>
											{article.checklist.map((line) => (
												<li key={line}>{line}</li>
											))}
										</ul>
									</div>
								) : null}
								{article.ctaNote ? (
									<p className='rounded-2xl border border-brand/25 bg-gradient-to-r from-brand/10 via-brand/5 to-transparent p-5 text-center font-manrope text-sm leading-relaxed text-textPrimary md:text-base'>
										{article.ctaNote}
									</p>
								) : null}
							</div>
						) : null}
					</section>
				))}
			</div>
		</div>
	);
}

export function BlogDetailPage() {
	const { t, i18n } = useTranslation();
	const params = useParams();

	const index = useMemo(() => {
		const raw = params.id;
		const n = raw ? Number(raw) : 0;
		if (!Number.isFinite(n)) return 0;
		return Math.min(Math.max(n, 0), ITEMS_COUNT - 1);
	}, [params.id]);

	const data = useMemo(() => {
		return {
			tag: t(`blogs.items.${index}.tag`),
			title: t(`blogs.items.${index}.title`),
			excerpt: t(`blogs.items.${index}.excerpt`),
			date: t(`blogs.items.${index}.date`),
			readTime: t(`blogs.items.${index}.readTime`),
		};
	}, [index, t]);

	const pageTitle = t("seo.blogPost.title", { title: data.title });
	const isArabic = (i18n.resolvedLanguage ?? "").startsWith("ar");
	const fullArticle =
		index === 0
			? isArabic
				? CONTENT_STRATEGY_ARTICLE_AR
				: CONTENT_STRATEGY_ARTICLE
			: index === 1
				? isArabic
					? DESIGN_SYSTEMS_ARTICLE_AR
					: DESIGN_SYSTEMS_ARTICLE
				: index === 2
					? isArabic
						? DESIGN_SYSTEMS_FAQ_ARTICLE_AR
						: DESIGN_SYSTEMS_FAQ_ARTICLE
					: null;

	const shoroukCollection =
		index === 3 ? (isArabic ? SHOROUK_ARTICLES_AR : SHOROUK_ARTICLES_EN) : null;

	return (
		<FramedPageShell>
			<Seo
				title={pageTitle}
				description={data.excerpt}
				path={`/blogs/${index}`}
				imagePath={OFFICE_IMG}
				ogType='article'
			/>
			<main className='mx-auto max-w-[1920px] px-5 py-10 text-charcoal md:px-9 md:py-14 lg:px-[120px]'>
				<div className='mb-6 flex items-center gap-3'>
					<Link
						to='/blogs'
						className='inline-flex items-center gap-2 text-sm font-semibold text-textPrimary transition hover:text-brand rtl:flex-row-reverse'>
						<ArrowLeft className='size-4' aria-hidden />
						<span>{t("blogs.readMore")}</span>
					</Link>
				</div>

				<article className='overflow-hidden rounded-3xl border border-dividerOnLight bg-surface shadow-[0_18px_50px_rgba(2,6,23,0.08)]'>
					<div className='relative'>
						<img
							src={OFFICE_IMG}
							alt={data.title}
							className='h-[280px] w-full object-cover md:h-[360px]'
						/>
						<div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/35 to-slate-950/10' />
						<div className='absolute left-0 top-0 flex h-full w-full items-end p-5 md:p-7'>
							<div className='max-w-4xl'>
								<p className='inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-white'>
									{data.tag}
								</p>
								<h1 className='mt-3 font-raleway text-3xl font-semibold leading-tight tracking-tight text-white md:text-5xl'>
									{data.title}
								</h1>
								<p className='mt-3 text-sm font-manrope text-white/85 md:text-base'>
									{data.date} · {data.readTime}
								</p>
							</div>
						</div>
					</div>

					<div className='p-5 md:p-8 lg:p-10'>
						<p className='mx-auto max-w-4xl font-manrope text-base leading-relaxed text-textSecondary md:text-lg'>
							{data.excerpt}
						</p>

						{shoroukCollection ? (
							<ShoroukCollectionBody
								isArabic={isArabic}
								articles={shoroukCollection}
							/>
						) : fullArticle ? (
							<div className='mt-10 border-t border-dividerOnLight pt-10 lg:grid lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-10'>
								<aside className='mb-8 lg:mb-0'>
									<div className='rounded-2xl border border-dividerOnLight bg-cream/40 p-5 lg:sticky lg:top-24'>
										<p className='font-manrope text-xs font-semibold uppercase tracking-[0.12em] text-textSecondary'>
											{isArabic ? "في هذه الصفحة" : "On this page"}
										</p>
										<ol className='mt-3 list-decimal space-y-2 ps-5 font-manrope text-sm text-textSecondary'>
											{fullArticle.toc.map((item) => (
												<li key={item}>{item}</li>
											))}
										</ol>
									</div>
								</aside>

								<div className='space-y-8'>
									<section className='rounded-2xl border border-dividerOnLight bg-brand/5 p-6'>
										<p className='font-manrope text-base leading-relaxed text-textPrimary md:text-lg'>
											{fullArticle.intro}
										</p>
									</section>

									<section>
										<h2 className='font-raleway text-2xl font-semibold text-textPrimary md:text-3xl'>
											{isArabic ? "إحصائيات سريعة" : "Quick stats"}
										</h2>
										<ul className='mt-4 grid gap-4 sm:grid-cols-3'>
											{fullArticle.quickStats.map((stat) => (
												<li
													key={stat}
													className='rounded-2xl border border-brand/20 bg-gradient-to-b from-brand/10 to-brand/5 p-5 text-sm font-semibold leading-relaxed text-textPrimary shadow-sm'>
													{stat}
												</li>
											))}
										</ul>
									</section>

									<section className='rounded-2xl border border-dividerOnLight bg-surface p-6'>
										<h2 className='font-raleway text-2xl font-semibold text-textPrimary md:text-3xl'>
											{isArabic
												? "لماذا تفشل أغلب الاستراتيجيات؟"
												: "Why most content strategies fail"}
										</h2>
										<ul className='mt-4 list-disc space-y-2 ps-5 font-manrope text-sm leading-relaxed text-textSecondary md:text-base'>
											{fullArticle.commonFailures.map((point) => (
												<li key={point}>{point}</li>
											))}
										</ul>
									</section>

									<section>
										<h2 className='font-raleway text-2xl font-semibold text-textPrimary md:text-3xl'>
											{isArabic ? "الإطار العملي" : "The 6-step framework"}
										</h2>
										<div className='mt-4 grid gap-4 md:grid-cols-2'>
											{fullArticle.steps.map((step) => (
												<article
													key={step.title}
													className='rounded-2xl border border-dividerOnLight bg-surface p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md'>
													<h3 className='font-raleway text-lg font-semibold text-textPrimary'>
														{step.title}
													</h3>
													<p className='mt-2 font-manrope text-sm leading-relaxed text-textSecondary md:text-base'>
														{step.body}
													</p>
												</article>
											))}
										</div>
									</section>

									<section className='rounded-2xl border border-dividerOnLight bg-surface p-6'>
										<h2 className='font-raleway text-2xl font-semibold text-textPrimary md:text-3xl'>
											{isArabic
												? "أفضل ممارسات SEO لتعزيز النتائج"
												: "SEO best practices to amplify your results"}
										</h2>
										<ul className='mt-4 list-disc space-y-2 ps-5 font-manrope text-sm leading-relaxed text-textSecondary md:text-base'>
											{fullArticle.seoBestPractices.map((item) => (
												<li key={item}>{item}</li>
											))}
										</ul>
									</section>

									<section className='rounded-2xl border border-dividerOnLight bg-surface p-6'>
										<h2 className='font-raleway text-2xl font-semibold text-textPrimary md:text-3xl'>
											{isArabic
												? "كيف تقيس أداء المحتوى"
												: "How to measure content performance"}
										</h2>
										<ul className='mt-4 list-disc space-y-2 ps-5 font-manrope text-sm leading-relaxed text-textSecondary md:text-base'>
											{fullArticle.metrics.map((metric) => (
												<li key={metric}>{metric}</li>
											))}
										</ul>
									</section>

									<section>
										<h2 className='font-raleway text-2xl font-semibold text-textPrimary md:text-3xl'>
											{isArabic ? "الأسئلة الشائعة" : "Frequently asked questions"}
										</h2>
										<div className='mt-4 space-y-4'>
											{fullArticle.faq.map((item) => (
												<article
													key={item.question}
													className='rounded-2xl border border-dividerOnLight bg-surface p-5 shadow-sm'>
													<h3 className='font-raleway text-lg font-semibold text-textPrimary'>
														{item.question}
													</h3>
													<p className='mt-2 font-manrope text-sm leading-relaxed text-textSecondary md:text-base'>
														{item.answer}
													</p>
												</article>
											))}
										</div>
									</section>

									<section className='rounded-2xl border border-brand/20 bg-gradient-to-r from-brand/10 via-brand/5 to-transparent p-6 text-center'>
										<p className='font-manrope text-base leading-relaxed text-textPrimary md:text-lg'>
											{isArabic
												? "جاهز لبناء نظام محتوى وتصميم يرفع نتائج أعمالك فعلياً؟"
												: "Ready to build a content strategy that actually drives revenue for your business?"}
										</p>
									</section>
								</div>
							</div>
						) : null}
					</div>
				</article>
			</main>

			<Footer />
		</FramedPageShell>
	);
}
