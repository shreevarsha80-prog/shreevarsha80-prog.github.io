// =========================================================================
// PROTOSEM 20-WEEK JOURNAL ARCHITECTURE
// PRICE ProtoSem 20-Week Industry-Integrated Innovation Programme
// Role: Innovation Engineer Trainee (100% Scholarship - 2026)
// =========================================================================

const protoSemWeeksData = [
  // -------------------------------------------------------------
  // PHASE 01: FOUNDATION, DISCOVERY & PROBLEM IMMERSION (Weeks 01-05)
  // -------------------------------------------------------------
  {
    week: 0,
    phase: 1,
    label: "WEEK 00",
    title: "Orientation & Cognitive Shift",
    subtitle: "Stepping into Industry-Integrated Innovation",
    status: "DOCUMENTED",
    date: "Week 00",
    tags: ["Orientation", "Innovation Mindset", "Foundations"],
    summary: "Initiation into the PRICE ProtoSem ecosystem. Bridging the gap between behavioral psychology and technology-driven problem statements.",
    content: `
      <p>The journey began with an intensive onboarding into the PRICE ProtoSem innovation framework. As a psychology undergraduate, the goal from day one was to approach technology not merely as code or hardware, but as an interface for human behavior, cognitive ergonomics, and real-world utility.</p>
      <div class="editorial-quote">"True innovation happens at the intersection of understanding human needs and engineering feasible, scalable solutions."</div>
      <p>Key highlights included mapping individual strengths, understanding the retail & commerce challenge landscape, and establishing personal learning milestones for the 20-week trajectory.</p>
    `,
    takeaways: [
      "Understanding the multidisciplinary ethos of ProtoSem",
      "Connecting psychological insights with product development",
      "Setting up sprint workflows and collaborative team norms"
    ]
  },
  {
    week: 1,
    phase: 1,
    label: "WEEK 01",
    title: "Problem Space Exploration & Field Immersion",
    subtitle: "Phygital Retail & Intelligent Commerce Discovery",
    status: "FIELD NOTES",
    date: "Week 01",
    tags: ["Phygital Retail", "User Research", "Observation"],
    summary: "Deep-diving into omnichannel retail friction points. Conducting contextual inquiries and behavioral observations.",
    content: `
      <p>Week 01 focused on problem discovery within modern retail environments. We analyzed the friction points shoppers encounter between digital browsing and in-store physical experiences.</p>
      <p>Using observational psychology frameworks, we mapped consumer dwell times, navigation hesitations, and decision paralysis at checkout touchpoints.</p>
    `,
    takeaways: [
      "Retail behavioral mapping & customer touchpoint analysis",
      "Identifying micro-frustrations in physical store navigation",
      "Formulating initial problem statements for intelligent commerce"
    ]
  },
  {
    week: 2,
    phase: 1,
    label: "WEEK 02",
    title: "Consumer Psychology & Behavioral Insights",
    subtitle: "Applying Cognitive Models to Commerce Challenges",
    status: "RESEARCH LOG",
    date: "Week 02",
    tags: ["Consumer Behavior", "Cognitive Load", "Empathy Mapping"],
    summary: "Synthesizing qualitative user interviews into actionable personas and empathy maps to guide technical architecture.",
    content: `
      <p>Translating psychological theory into product empathy. We conducted structured interviews across varied shopper demographics to evaluate how sensory stimuli, packaging, and digital displays impact purchase confidence.</p>
      <p>Examined cognitive heuristics (scarcity, social proof, anchoring) and how intelligent systems can assist rather than overwhelm the shopper.</p>
    `,
    takeaways: [
      "Empathy mapping for diverse retail user segments",
      "Evaluating choice overload and cognitive fatigue in shopping",
      "Drafting core user requirement specifications"
    ]
  },
  {
    week: 3,
    phase: 1,
    label: "WEEK 03",
    title: "Systems Thinking & Architectural Blueprints",
    subtitle: "Mapping Data Flows across IoT & Intelligent Systems",
    status: "SYSTEMS SPRINT",
    date: "Week 03",
    tags: ["IoT", "Intelligent Systems", "Architecture"],
    summary: "Bridging human workflows with hardware sensors, RFID tracking, and cloud telemetry.",
    content: `
      <p>This week we mapped the end-to-end data pipeline from physical sensor capture to cloud analytics. Explored edge computing nodes, smart shelf sensors, and automated inventory sync.</p>
      <p>Emphasized the necessity for low-latency feedback loops so that physical interactions instantly update digital dashboards.</p>
    `,
    takeaways: [
      "System architecture diagramming for connected retail",
      "Sensor selection: ultrasonic, RFID, weight-based telemetry",
      "Defining hardware-software communication protocols"
    ]
  },
  {
    week: 4,
    phase: 1,
    label: "WEEK 04",
    title: "AI & Predictive Analytics Frameworks",
    subtitle: "Transforming Raw Footfall into Behavioral Signals",
    status: "DATA LAB",
    date: "Week 04",
    tags: ["AI & Analytics", "Predictive Modeling", "Heatmaps"],
    summary: "Exploring computer vision and predictive algorithms to understand store traffic flow and heatmaps ethically.",
    content: `
      <p>Investigating machine learning pipelines that interpret foot-traffic heatmaps and conversion funnels without compromising customer privacy.</p>
      <p>Designed predictive inventory alerts based on historical footfall trends and seasonal buying patterns.</p>
    `,
    takeaways: [
      "Ethical AI considerations in physical space tracking",
      "Footfall analytics & dwell-time clustering algorithms",
      "Predictive demand forecasting fundamentals"
    ]
  },
  {
    week: 5,
    phase: 1,
    label: "WEEK 05",
    title: "Phase 01 Review & Solution Synthesis",
    subtitle: "Pitching Problem Validation & Feasibility Gates",
    status: "PHASE GATE REVIEW",
    date: "Week 05",
    tags: ["Milestone", "Presentation", "Validation"],
    summary: "Presenting comprehensive problem validation and technological roadmap to industry mentors and ProtoSem faculty.",
    content: `
      <p>Culmination of Phase 01. Presented validated problem statements, customer journey maps, and technical architecture feasibility study.</p>
      <p>Received constructive feedback on refining sensor calibration and narrowing the proof-of-concept scope for Phase 02 rapid prototyping.</p>
    `,
    takeaways: [
      "Defending research methodologies before panel evaluators",
      "Refining scope based on real-world constraints",
      "Clear green-light for Phase 02 hands-on prototyping"
    ]
  },

  // -------------------------------------------------------------
  // PHASE 02: RAPID PROTOTYPING & HARDWARE-SOFTWARE INTEGRATION (Weeks 06-10)
  // -------------------------------------------------------------
  {
    week: 6,
    phase: 2,
    label: "WEEK 06",
    title: "Low-Fidelity Prototyping & Interface Wireframes",
    subtitle: "Drafting the Phygital Interaction Canvas",
    status: "BUILD LOG",
    date: "Week 06",
    tags: ["UI/UX", "Wireframing", "Figma"],
    summary: "Creating interactive digital kiosk wireframes and mobile companion interfaces tailored for fast, distraction-free retail interaction.",
    content: `
      <p>Drafted high-contrast, accessible UI layouts for in-store touchpoints. Tested button tap target sizes, information hierarchy, and minimal-step checkout flows.</p>
      <p>Conducted peer usability tests to measure task completion speed and error rates.</p>
    `,
    takeaways: [
      "Accessible UI design for public retail kiosks",
      "Micro-interaction ergonomics for standing users",
      "Iterative paper prototype testing"
    ]
  },
  {
    week: 7,
    phase: 2,
    label: "WEEK 07",
    title: "Sensor Circuitry & Microcontroller Prototyping",
    subtitle: "Assembling Hardware Breadboards & Telemetry Nodes",
    status: "HARDWARE LAB",
    date: "Week 07",
    tags: ["Microcontrollers", "Circuits", "Sensors"],
    summary: "Interfacing ESP32 and Arduino boards with distance sensors and optical modules for smart shelf presence detection.",
    content: `
      <p>Hands-on circuit assembly in the PRICE hardware lab. Calibrated sensor thresholds to ignore ambient noise and detect deliberate customer pick-up actions accurately.</p>
      <p>Programmed firmware interrupt routines to transmit state changes over MQTT/WebSockets.</p>
    `,
    takeaways: [
      "Soldering and hardware breadboard prototyping",
      "Noise filtering and signal debouncing techniques",
      "Real-time MQTT messaging for edge telemetry"
    ]
  },
  {
    week: 8,
    phase: 2,
    label: "WEEK 08",
    title: "IoT Middleware & Cloud Telemetry Integration",
    subtitle: "Connecting Physical Shelves to Real-Time Dashboards",
    status: "CLOUD SPRINT",
    date: "Week 08",
    tags: ["Cloud Telemetry", "WebSockets", "Dashboards"],
    summary: "Developing backend middleware to ingest sensor telemetry and render live store status on managerial dashboards.",
    content: `
      <p>Built server endpoints that subscribe to MQTT broker topics, parse JSON payloads, and update a centralized PostgreSQL/Supabase database.</p>
      <p>Integrated real-time WebSocket listeners on the frontend to display instant visual feedback when items are lifted from display docks.</p>
    `,
    takeaways: [
      "Pub/Sub architecture for IoT event streams",
      "Real-time state synchronization across web clients",
      "Handling connection dropouts and offline fallback states"
    ]
  },
  {
    week: 9,
    phase: 2,
    label: "WEEK 09",
    title: "Computer Vision & Visual Merchandising Experiments",
    subtitle: "Testing Edge AI for Product Engagement Analysis",
    status: "AI LAB",
    date: "Week 09",
    tags: ["Computer Vision", "Object Detection", "Analytics"],
    summary: "Prototyping lightweight edge-vision models using OpenCV to detect product orientation and customer attention zones.",
    content: `
      <p>Explored OpenCV models to track gaze direction toward promotional banners and display shelves. Evaluated frame processing rates on constrained edge devices.</p>
      <p>Benchmarked accuracy against lighting variations in ambient retail conditions.</p>
    `,
    takeaways: [
      "Edge AI optimization on low-power compute modules",
      "Bounding box detection for packaged retail goods",
      "Lighting compensation algorithms for computer vision"
    ]
  },
  {
    week: 10,
    phase: 2,
    label: "WEEK 10",
    title: "Phase 02 Mid-Term Evaluation & Working PoC Demo",
    subtitle: "Live Demonstration of Integrated Hardware-Software Prototype",
    status: "MID-TERM MILESTONE",
    date: "Week 10",
    tags: ["Mid-Term", "Live Demo", "Milestone"],
    summary: "Successful live demonstration of the smart interactive shelf prototype to jury members and enterprise mentors.",
    content: `
      <p>A high-stakes milestone: our team demonstrated an end-to-end working prototype. An item picked up from the shelf triggered an instant interactive product breakdown on the adjacent screen while logging engagement duration in the analytics portal.</p>
      <p>Received high commendation for the intuitive user feedback and seamless response latency (<120ms).</p>
    `,
    takeaways: [
      "Delivering dependable live hardware-software demonstrations",
      "Quantifying latency benchmarks and system reliability",
      "Roadmapping user testing trials for Phase 03"
    ]
  },

  // -------------------------------------------------------------
  // PHASE 03: PILOT TESTING, DATA VALIDATION & ITERATION (Weeks 11-15)
  // -------------------------------------------------------------
  {
    week: 11,
    phase: 3,
    label: "WEEK 11",
    title: "Controlled Environment User Testing",
    subtitle: "Simulating Real Retail Scenarios in Sandbox",
    status: "USER TESTING",
    date: "Week 11",
    tags: ["Pilot Testing", "Usability Metrics", "Heuristics"],
    summary: "Running structured test scenarios with diverse cohort participants to uncover edge cases and behavioral drop-offs.",
    content: `
      <p>Constructed a mock retail bay to observe real shoppers interacting with the system. Measured metrics including time-to-information discovery, comprehension of digital specs, and spontaneous customer delight.</p>
      <p>Discovered that subtle auditory cues significantly enhanced user confidence when lifting products.</p>
    `,
    takeaways: [
      "Designing controlled usability test protocols",
      "Multisensory feedback: combining sound and visual cues",
      "Identifying unpredicted user behavior patterns"
    ]
  },
  {
    week: 12,
    phase: 3,
    label: "WEEK 12",
    title: "Data Analytics & Interaction Analytics Pipeline",
    subtitle: "Translating Sensor Logs into Business Intelligence",
    status: "ANALYTICS LAB",
    date: "Week 12",
    tags: ["Business Intelligence", "Metrics", "Dashboards"],
    summary: "Developing analytics visualizations that highlight product comparison frequency, dwell times, and conversion rates.",
    content: `
      <p>Built executive summary dashboards aggregating daily engagement metrics. Designed intuitive heatmaps highlighting top-performing display sections.</p>
      <p>Correlated physical interaction duration with subsequent purchase intent survey scores.</p>
    `,
    takeaways: [
      "Executive data visualization principles",
      "Statistical correlation between dwell time and purchase propensity",
      "Automated PDF reporting generation for store managers"
    ]
  },
  {
    week: 13,
    phase: 3,
    label: "WEEK 13",
    title: "Industrial Design & Enclosure Optimization",
    subtitle: "Ergonomics, Aesthetics & Enclosure Fabrication",
    status: "FABRICATION LAB",
    date: "Week 13",
    tags: ["3D Printing", "Industrial Design", "CAD"],
    summary: "Designing custom 3D-printed enclosures for sensors and cabling to blend seamlessly into modern retail fixtures.",
    content: `
      <p>Utilized CAD modeling to design minimalist, snap-fit sensor housing cases. Ensured proper heat dissipation and cable management channels.</p>
      <p>Iterated on matte finishes to prevent glare and maintain a premium retail aesthetic.</p>
    `,
    takeaways: [
      "CAD modeling for functional additive manufacturing",
      "Material selection for durability and aesthetics",
      "Design for assembly (DFA) best practices"
    ]
  },
  {
    week: 14,
    phase: 3,
    label: "WEEK 14",
    title: "Security, Reliability & Stress Testing",
    subtitle: "Fault Tolerance, Edge Recovery & Network Resilience",
    status: "STRESS TEST",
    date: "Week 14",
    tags: ["Reliability", "Stress Testing", "Security"],
    summary: "Simulating heavy traffic, rapid concurrent interactions, and unexpected network dropouts to harden system resilience.",
    content: `
      <p>Conducted soak testing and automated simulated pick-up cycles over continuous 48-hour periods. Implemented watchdog timers and local SQLite caching for network disconnect scenarios.</p>
      <p>Optimized memory leaks on client display browsers running on compact hardware.</p>
    `,
    takeaways: [
      "Offline-first architecture for mission-critical retail tech",
      "Automated stress testing and error logging pipelines",
      "Device security & credential encryption on edge nodes"
    ]
  },
  {
    week: 15,
    phase: 3,
    label: "WEEK 15",
    title: "Phase 03 Evaluation & Business Feasibility Gate",
    subtitle: "Validating Unit Economics & Commercial Viability",
    status: "COMMERCIAL GATE",
    date: "Week 15",
    tags: ["Unit Economics", "Commercialization", "Review"],
    summary: "Presenting pilot validation data, system stability benchmarks, and commercial cost-benefit models to mentors.",
    content: `
      <p>Demonstrated Phase 03 outcomes highlighting 99.4% sensor trigger accuracy and measurable increases in product engagement during sandbox trials.</p>
      <p>Presented Bill of Materials (BOM) cost optimization calculations proving feasibility for small-to-medium retail footprint rollout.</p>
    `,
    takeaways: [
      "BOM cost reduction strategies for volume scale",
      "Formulating ROI models for retail store operators",
      "Approval to advance into final deployment polish"
    ]
  },

  // -------------------------------------------------------------
  // PHASE 04: SCALE, DEPLOYMENT & CAPSTONE DEMO DAY (Weeks 16-20)
  // -------------------------------------------------------------
  {
    week: 16,
    phase: 4,
    label: "WEEK 16",
    title: "Enterprise Integration & API Hardening",
    subtitle: "Connecting with Existing POS & Inventory Management Systems",
    status: "INTEGRATION SPRINT",
    date: "Week 16",
    tags: ["API", "Enterprise Integration", "POS"],
    summary: "Developing standard REST/GraphQL endpoints for two-way synchronization with retail ERP and POS software.",
    content: `
      <p>Designed modular API connectors allowing smart shelf events to trigger instant inventory replenishment requests and dynamic price tag updates.</p>
      <p>Implemented rate limiting, JWT authentication, and structured swagger documentation.</p>
    `,
    takeaways: [
      "Enterprise software integration patterns",
      "Standardizing REST API contracts & Swagger docs",
      "Secure authentication protocols for distributed edge devices"
    ]
  },
  {
    week: 17,
    phase: 4,
    label: "WEEK 17",
    title: "Market Strategy, Branding & Go-to-Market",
    subtitle: "Positioning Intelligent Phygital Solutions for Retailers",
    status: "GTM PLANNING",
    date: "Week 17",
    tags: ["Go-to-Market", "Branding", "Marketing Strategy"],
    summary: "Synthesizing product value propositions, collateral, case study summaries, and investor pitch decks.",
    content: `
      <p>Crafted the core narrative: how phygital intelligence empowers brick-and-mortar stores to achieve e-commerce level analytics while preserving tactile human shopping joy.</p>
      <p>Produced video walk-throughs and customer testimonial storyboards.</p>
    `,
    takeaways: [
      "Crafting compelling technology pitch narratives",
      "B2B retail buyer persona segmentation",
      "Developing multimedia collateral for product demonstrations"
    ]
  },
  {
    week: 18,
    phase: 4,
    label: "WEEK 18",
    title: "Final System Assembly & Field Polish",
    subtitle: "Complete Hardware Encasement & Production Deployment",
    status: "FINAL ASSEMBLY",
    date: "Week 18",
    tags: ["Production", "Enclosure", "Quality Assurance"],
    summary: "Final physical assembly, wiring harness clean-up, and production build optimization across all software modules.",
    content: `
      <p>Assembled the final production-grade display unit. All sensors, controllers, and wiring are seamlessly concealed within brushed wood and matte acrylic fixtures.</p>
      <p>Executed comprehensive QA check spanning over 500 consecutive test cycles.</p>
    `,
    takeaways: [
      "Production-level quality assurance protocols",
      "Industrial finish perfection for commercial spaces",
      "Stress-tested system zero-failure certification"
    ]
  },
  {
    week: 19,
    phase: 4,
    label: "WEEK 19",
    title: "Rehearsals, Demo Dry-Runs & Jury Prep",
    subtitle: "Polishing Technical Explanations & Live Interactions",
    status: "DEMO REHEARSALS",
    date: "Week 19",
    tags: ["Pitching", "Rehearsals", "Public Speaking"],
    summary: "Refining presentation pacing, handling live edge questions, and ensuring flaw-free stage demonstrations.",
    content: `
      <p>Multiple rounds of rigorous mock presentations before industry advisors. Refined the transition between psychological problem context, engineering architecture, and live demo interaction.</p>
      <p>Fine-tuned responses to deep-dive questions on scalability, unit economics, and data security.</p>
    `,
    takeaways: [
      "High-impact public speaking for technical innovation",
      "Anticipating technical jury inquiries with data-backed answers",
      "Team synchronization during multi-part presentations"
    ]
  },
  {
    week: 20,
    phase: 4,
    label: "WEEK 20",
    title: "Capstone Demo Day & 20-Week Culmination",
    subtitle: "Graduation from PRICE ProtoSem Innovation Programme",
    status: "CAPSTONE CELEBRATION",
    date: "Week 20",
    tags: ["Capstone", "Graduation", "Excellence", "PRICE ProtoSem"],
    summary: "Showcasing the completed innovation project to industry executives, enterprise leaders, and academic leadership.",
    content: `
      <p>The grand finale of the 20-week PRICE ProtoSem innovation fellowship. Our team presented the fully validated, deployed phygital retail intelligent system to a standing room of corporate executives, investors, and faculty leaders.</p>
      <p>This 20-week crucible permanently transformed my worldview—proving that psychology, engineering rigor, and entrepreneurial passion create unprecedented value when united.</p>
      <div class="editorial-quote">"We didn't just build a smart shelf; we engineered a seamless conversation between physical spaces and human curiosity."</div>
    `,
    takeaways: [
      "Successful capstone showcase before top enterprise leaders",
      "Mastery of end-to-end product development lifecycle",
      "Lifelong foundation in innovation engineering and team leadership"
    ]
  }
];
