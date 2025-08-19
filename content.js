/* global window */

window.PORTFOLIO = {
  meta: {
    name: "Sparsh Batra",
    handle: "sparshb4tra",
    location: "New Delhi, India",
    email: "me@sbatra.xyz",
    site: "https://sbatra.xyz",
    github: "https://github.com/sparshb4tra",
    linkedin: "https://linkedin.com/in/sparsh-batra",
    resume: "https://www.dropbox.com/scl/fi/i768lg5b8464s8re8nk24/SPARSH-BATRA_Resume.pdf?rlkey=n6jeuzqatjlbwcwkrjk1rpbf6&e=1&st=xzvp63np&dl=0",
  },

  // Custom ASCII; leave empty to use generated name art
  ascii: String.raw`
  ######      #      ########## # #     #   ######      #      
             #######       ###  # #     #              ########
##########  #     #       #            #  ##########  #       #
     #     # #   #       #            #        #     #      ## 
     #        ###       #           ##         #          ##   
    #        ##        #          ##          #         ##     
  ##       ##         #         ##          ##        ##       
                                                               
      ## ########## #    # #     # ##########                  
    ##         ###  #    # #     #       ###                   
  ## #        #     ##          #       #                      
##   #       #      # #        #       #                       
     #      #       #  #     ##       #                        
     #     #        #      ##        #                         
     #    #         #    ##         #                         
`,

  about: `I'm a Software Developer and Data/ML enthusiast focused on building reliable, fast user experiences and applied ML systems. I enjoy crafting minimal, high-performance apps with clear UX and readable code.`,

  highlights: [
    "Software Development Intern @ Hughes Systique Corporation",
    "Projects: AI data quality tool, Stock LSTM forecasting, Fraud Detection, KrishiRakshak",
    "Interests: ML systems, time series, terminal UIs, web perf",
  ],

  skills: {
    languages: ["Python", "SQL", "R", "Java", "JavaScript"],
    ml: ["scikit-learn", "TensorFlow", "Keras", "PyTorch", "Predictive Modeling", "Neural Networks"],
    da: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Tableau", "Power BI", "Excel"],
    db: ["MySQL", "PostgreSQL", "AWS", "Google Cloud"],
    tools: ["Git", "Docker", "Figma", "Jupyter", "MATLAB"],
  },

  projects: [
    {
      name: "AI-Enhanced Data Cleaning & Analytics Tool",
      stack: ["Next.js", "TypeScript", "React", "Data Processing", "Statistical Analysis"],
      date: "Aug 2025",
      links: { live: "https://nom-nom-25.vercel.app" },
      notes: [
        "CSV/Excel uploads with automated quality assessment and profiling",
        "Outlier detection, imputation, report generation (PDF/HTML)",
      ],
    },
    {
      name: "Stock Price Forecasting on AAPL Using Stacked LSTM",
      stack: ["Python", "Keras", "TensorFlow", "Tiingo API"],
      date: "July 2025",
      links: { github: "https://github.com/sparshb4tra/Stock-Price-Prediction-using-LSTM" },
      notes: ["Fetched and normalized OHLC data, stacked LSTM for short-term forecasting"],
    },
    {
      name: "Financial Fraud Detection System",
      stack: ["Python", "scikit-learn", "Streamlit", "Pandas"],
      date: "July 2025",
      links: { github: "https://github.com/sparshb4tra/FraudDetection" },
      notes: [
        "Pipeline across 6.3M+ transactions; logistic regression with class balancing",
        "Feature engineering on TRANSFER/CASH OUT patterns; interactive dashboard",
      ],
    },
    {
      name: "KrishiRakshak — AI Agricultural Disease Detection",
      stack: ["Python", "TensorFlow", "InceptionV3", "Flutter", "Firebase"],
      date: "Sep 2023",
      links: { github: "https://github.com/sparshb4tra/KrishirakshakCropDiseaseDetectionapp" },
      notes: ["High-accuracy plant disease classification with fast inference"],
    },
  ],

  experience: [
    {
      role: "Software Development Intern",
      org: "Hughes Systique Corporation",
      date: "Jul 2025",
      bullets: [
        "Auth.js + Magic Link via Mailtrap; improved reliability",
        "Automated PDF invoice generation and email dispatch; -60% manual time",
        "Dashboards with TailwindCSS + Shadcn; faster decisions",
        "Neon Postgres + Prisma ORM; -35% infra costs",
      ],
    },
    {
      role: "Software Development Intern",
      org: "Hughes Systique Corporation",
      date: "Jun 2024 - Jul 2024",
      bullets: [
        "Real-time inventory using Python + MySQL + ML; -30% stockouts",
        "Database query optimizations and low-latency responses",
        "ML-integrated dashboards with 99.9% uptime",
      ],
    },
  ],

  achievements: [
    "Cisco Networking Academy: Data Science Essentials with Python (Aug 2025)",
    "Simplilearn + Google Cloud: LLM course (Aug 2025)",
    "Stanford University & Deeplearning.AI: Supervised ML certificate (May 2025)",
    "Boston Consulting Group: Data Science Job Simulation (Jan 2025)",
    "Smart India Hackathon: AI Job Portal (Sep 2024)",
    "Google Data Analytics Professional Certificate (Aug 2024)",
  ],
};

