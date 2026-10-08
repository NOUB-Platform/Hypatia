import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import * as archiverNamespace from "archiver";

const archiver = (archiverNamespace as any).default || archiverNamespace;

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "15mb" }));

// Server-side Gemini Client
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY is not set in environment variables");
  }
  return new GoogleGenAI({
    apiKey: apiKey || "",
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// Memory store for recent Telegram messages / activity log
const telegramActivityLog: Array<{
  id: string;
  time: string;
  sender: string;
  text: string;
  reply?: string;
}> = [];

// System Persona for Hypatia (Personal Senior Tech & Ops Assistant)
const HYPATIA_SYSTEM_PROMPT = `
أنت "هيباتيا" (Hypatia) - المساعد التقني والبرمجي الشخصي لـ (سامح يس)، رئيس قطاع التكنولوجيا والأنظمة لشركة مشاوير للمنصات الرقمية (CTO & Systems Lead).

أنت تعمل معه كشريك تنفيذي عملي (Senior Co-Engineer & IT Ops Lead) في غرفة العمليات وإدارة المشاريع:

1. أسلوب التفاعل:
   - لغة عربية رصينة، تقنية، عملية، ذكية، وموجزة.
   - ركّز على الإنجاز الفوري والحلول البرمجية والتشغيلية المعتمدة.
   - ممنوع أسلوب المدح والثناء أو المجاملات المصطنعة، وممنوع الاستنتاجات السطحية.
   - ادخل في صلب الموضوع فوراً (الرؤية الهندسية ثم التفاصيل والحلول).

2. القدرات البرمجية والتشغيلية في الشات (Conversational Engine):
   - كتابة وتعديل وترقية الأكواد: عندما يطلب منك كوداً أو فحص دالة أو ميزة لتطبيقات (4B, WeKaLa, Daro, Mashweer Driver) قدّم الكود كاملاً ونظيفاً وموثقاً (TypeScript, Flutter, Python, SQL, React).
   - قواعد البيانات والاستعلامات: صياغة استعلامات Supabase و PostgreSQL مع تحسين الفهارس واستعلامات PostGIS الجغرافية لتتبع الرحلات والأسطول.
   - إدارة البنية التحتية والشبكات والـ IT:
     * سيرفر الداتا سنتر المحلي DELL PowerEdge R640 Platinum (48 Cores) ومحطات HP Z440.
     * راك بيرلا 27U، سويتشات Cisco 3850 PoE، باتش بانل 48 بورت، وتمديدات كابلات Cat6.
     * خطوط الربط المباشرة مع المصرية للاتصالات (Telecom Egypt - WE): خط الربط التجميعي 24Mbps L3VPN عبر الفايبر و 6 خطوط فرعية 4Mbps، وسيرفر 4B السحابي بالقرية الذكية وجدار الحماية F5 WAF.
     * التوافق مع اشتراطات وزارة النقل وجهاز تنظيم النقل البري الداخلي والدولي (LTRA) والقانون 87 لسنة 2018.
   - منظومة تطبيقات مشاوير:
     * تطبيق فور بي (4B): حجز الرحلات وتوجيه الكباتن والـ Surge Pricing وبوابة الدفع.
     * منظومة وكالة (WeKaLa): إدارة أساطيل المكاتب وعمولات الوكلاء بالمحافظات.
     * منصة دارو (Daro): شحن الطرود واللوجستيات والبوالص الرقمية وماسح الباركود.
     * تطبيق كابتن مشاوير (Driver): تتبع الرحلات اللحظي عبر WebSockets ومحفظة الكابتن.
   - المحرك المعرفي والأبحاث:
     * بروتوكول UCP-LLM وأبحاث مسابقة كاجل (Kaggle Developer Agent) ونموذج Gemma 4.

3. ردود الشات:
   - دائماً كن عملياً ومباشراً واطرح حلولاً واضحة وقابلة للتنفيذ.
`;

// Health check
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    app: "Hypatia - Personal Senior Tech & Ops Assistant",
    time: new Date().toISOString(),
    geminiConfigured: !!process.env.GEMINI_API_KEY,
  });
});

// 1. General Executive Chat Endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history, context, activeProject } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Fallback if API key is not configured
    if (!process.env.GEMINI_API_KEY) {
      let smartFallbackReply = "";
      const lowerMsg = (message || "").toLowerCase();

      if (lowerMsg.includes("عقد") || lowerMsg.includes("تسليم") || lowerMsg.includes("4b") || lowerMsg.includes("استلام") || lowerMsg.includes("وكالة") || lowerMsg.includes("wekala") || lowerMsg.includes("دارو") || lowerMsg.includes("daro")) {
        smartFallbackReply = `### 📋 قائمة التحقق الفنية لاستلام تطبيقات مشاوير الثلاثة (4B • WeKaLa • Daro)
أهلاً يا باشمهندس سامح. بصفتي شريكك التقني، هذه هي أهم البنود الفنية الإلزامية قبل اعتماد التسليم وصرف الدفعة النهائية:
1. **السورس كود ومستودع GitHub:** التأكد من استلام كود نظيف مكتوب بـ TypeScript/Flutter بدون hardcoded keys أو روابط سيرفرات تجريبية.
2. **ملفات التوقيع (Keystore & SHA-256):** استلام ملفات \`.jks\` أو \`.keystore\` الرسمية وكلمات المرور الخاصة بها، وشهادات الـ SHA-1 و SHA-256 لربط Google Play Console و Firebase.
3. **قواعد البيانات (Supabase/PostgreSQL):** استلام ملفات الـ Migration وجداول المستخدمين والرحلات وتفعيل Row Level Security (RLS).
4. **حزم التوزيع:** استلام نسخ APK و AAB موجهة للإنتاج (Release Builds) مجربة ومطابقة لاشتراطات متاجر التطبيقات.`;
      } else if (lowerMsg.includes("إيميل") || lowerMsg.includes("ايميل") || lowerMsg.includes("zoho") || lowerMsg.includes("dns") || lowerMsg.includes("mashweer")) {
        smartFallbackReply = `### 🌐 إعداد إيميلات نطاق مشاوير (mashweer.com.eg) مجاناً 100%
الخطة المعتمدة بدون أي اشتراكات شهرية:
1. **تسجيل الحساب:** عبر خطة **Zoho Mail Forever Free** (تمنحك 5 حسابات بريد رسمية مجانية مدى الحياة بمساحة 5GB لكل صندوق بريد).
2. **ربط سجلات الـ DNS:**
   - **MX 1:** \`mx.zoho.com\` (Priority 10)
   - **MX 2:** \`mx2.zoho.com\` (Priority 20)
   - **TXT (SPF):** \`v=spf1 include:zoho.com ~all\`
3. توجه لتبويب **المزيد ☰ > إيميلات مشاوير** لنسخ السجلات وضبط الحسابات فوراً.`;
      } else if (lowerMsg.includes("نوب") || lowerMsg.includes("noub") || lowerMsg.includes("رياضي") || lowerMsg.includes("sports")) {
        smartFallbackReply = `### ⚽ منظومة تطبيق نوب سبورتس (NOUB Sports)
- **الحالة الحالية:** قيد التطوير والربط مع الأكاديميات وحجز الملاعب.
- **مسار الأصول على Google Drive:** \`drive.google.com/drive/folders/noub-sports-assets\` (محقون في النظام).
- **المعمارية التقنية:** واجهة React Native / Expo مع Supabase PostgreSQL للجداول وحجوزات الملاعب وإشعارات الـ Push.`;
      } else {
        smartFallbackReply = `أهلاً يا باشمهندس سامح. تم استلام طلبك بخصوص **"${message}"** وجاري تحليله هندسياً لمشروع ${activeProject ? activeProject.name : 'المنظومة'}.
- **حالة المحرك:** يعمل النظام حالياً بنمط المساعد الداخلي الذكي. لتفعيل التوليد السحابي المباشر عبر **Gemini 3.8 Flash**، تأكد من توفر مفتاح \`GEMINI_API_KEY\` في إعدادات البيئة.
- كافة السياقات وأصول Google Drive محفوظة ومحقونة في النظام.`;
      }

      return res.json({
        reply: smartFallbackReply,
        timestamp: new Date().toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" }),
        isFallback: true,
      });
    }

    const ai = getGeminiClient();

    let contextString = "";
    if (activeProject) {
      contextString += `\nالمشروع النشط المحدد حالياً:
اسم المشروع: ${activeProject.name || ''}
الكود: ${activeProject.code || ''}
التصنيف: ${activeProject.category || ''}
الوصف: ${activeProject.description || ''}
رابط الفيجما: ${activeProject.figmaUrl || 'غير محدد'}
آخر ملف APK: ${JSON.stringify(activeProject.apkFiles?.[0] || 'لا يوجد ملفات حالياً')}
الملاحظات العامة: ${activeProject.notes || ''}
`;

      // 📂 Google Drive Folders & Files Context Injection
      if (activeProject.driveAssets && activeProject.driveAssets.length > 0) {
        contextString += `\n📂 مسارات ومجلدات Google Drive وأصول المشروع الموثقة:
${activeProject.driveAssets.map((da: any, idx: number) => 
  `${idx + 1}. [${da.type.toUpperCase()}] ${da.name}:
   - المسار / الرابط: ${da.pathOrUrl}
   - ملاحظات المحتويات: ${da.notes || 'لا يوجد'}`
).join('\n')}
`;
      }

      // 💬 Reference Chats & External Transcripts (Claude, ChatGPT, etc.)
      if (activeProject.referenceChats && activeProject.referenceChats.length > 0) {
        contextString += `\n💬 مراجع المحادثات السابقة وخلاصات الجلسات (ChatGPT / Claude / Other):
${activeProject.referenceChats.map((rc: any, idx: number) => 
  `${idx + 1}. [${rc.platform}] "${rc.title}":
   - الرابط: ${rc.url}
   - القرارات والنقاط المستخلصة (Key Takeaways): ${rc.keyTakeaways}
   - دور هيباتيا في استخدام هذا المرجع: ${rc.relevanceToProject}`
).join('\n')}
`;
      }

      // 💡 Context Hints
      if (activeProject.contextHints && activeProject.contextHints.length > 0) {
        contextString += `\n💡 توجيهات وملاحظات سياقية دائمة (Context Hints):
${activeProject.contextHints.map((hint: string, idx: number) => `• ${hint}`).join('\n')}
`;
      }
    }
    if (context) {
      contextString += `\nبيانات إضافية:\n${JSON.stringify(context, null, 2)}\n`;
    }

    // Prepare contents array
    const contents: any[] = [];
    if (history && Array.isArray(history)) {
      for (const h of history.slice(-8)) {
        contents.push({
          role: h.sender === "user" ? "user" : "model",
          parts: [{ text: h.content }],
        });
      }
    }
    contents.push({
      role: "user",
      parts: [{ text: `${contextString}\nطلب المستخدم:\n${message}` }],
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: contents,
      config: {
        systemInstruction: HYPATIA_SYSTEM_PROMPT,
        temperature: 0.7,
      },
    });

    const replyText = response.text || "تمت معالجة الطلب، لكن لم يتوفر نص توضيحي.";

    return res.json({
      reply: replyText,
      timestamp: new Date().toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" }),
    });
  } catch (error: any) {
    console.error("Chat error:", error);
    return res.status(500).json({
      error: error.message || "حدث خطأ أثناء معالجة الطلب مع هيباتيا.",
    });
  }
});

// Upgrade / Refactor Code Endpoint
app.post("/api/gemini/upgrade-code", async (req, res) => {
  try {
    const { code, goal, language, project } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      // High-quality static enhancement fallback for testing
      const sampleRefactor = `// كود مُحسّن ومُرقى هندسياً بمعايير TypeScript و Clean Code
interface FareCalculationParams {
  baseFare: number;
  distanceKm: number;
  surgeMultiplier?: number;
  couponDiscount?: number;
}

interface FareResult {
  total: number;
  isSurged: boolean;
  appliedDiscount: number;
}

/**
 * حساب تسعيرة الرحلة بدقة مع حماية القيم السالبة والـ Surge
 */
export function calculateTripFare({
  baseFare,
  distanceKm,
  surgeMultiplier = 1.0,
  couponDiscount = 0,
}: FareCalculationParams): FareResult {
  // 1. حماية من الأرقام غير المنطقية أو السالبة
  const validBase = Math.max(0, Number(baseFare) || 0);
  const validDistance = Math.max(0, Number(distanceKm) || 0);
  const validMultiplier = Math.max(1.0, Number(surgeMultiplier) || 1.0);
  const validCoupon = Math.max(0, Number(couponDiscount) || 0);

  // 2. حساب الأساس والمسافة
  const subtotal = validBase + (validDistance * 2.5);
  
  // 3. تطبيق الـ Surge
  const surgedTotal = subtotal * validMultiplier;
  
  // 4. تطبيق الخصم بحد أدنى صفر
  const finalTotal = Math.max(0, surgedTotal - validCoupon);

  return {
    total: Number(finalTotal.toFixed(2)),
    isSurged: validMultiplier > 1.0,
    appliedDiscount: validCoupon,
  };
}`;

      return res.json({
        upgradedCode: sampleRefactor,
        changes: [
          "إضافة واجهات TypeScript قوية (Interfaces) لضبط مدخلات ومخرجات الدالة.",
          "تطبيق معالجة دفاعية كاملة ضد القيم السالبة أو غير المعرفة (Null Safety & Defensive Math).",
          "تقريب النتيجة لمنزلتين عشريتين بدقة لحسابات العملات المالية (SAR / EGP).",
          "فصل كائن النتيجة لتوضيح حالة الـ Surge وقيمة الخصم الفعلية.",
        ],
        tip: "ملاحظة: هذا التحليل الهندسي السريع تم بواسطة المحرك المدمج. لتفعيل المعالجة التوليدية اللحظية بالذكاء الاصطناعي عبر Gemini 3.8 Flash، يرجى ضبط مفتاح GEMINI_API_KEY في إعدادات البيئة.",
      });
    }

    const ai = getGeminiClient();

    const prompt = `
أنت مهندس برمجيات محترف (Senior Software Engineer).
المشروع المطلوب ترقية كوده: ${project || 'تطبيق المستخدم'}
لغة البرمجة: ${language || 'TypeScript / React / Node.js'}
الهدف المطلوب من الترقية والتعديل:
"${goal || 'تحسين الأداء، معالجة الأخطاء المحتملة، وتحديث الأسلوب'}"

الكود البرمجي الحالي:
\`\`\`${language || ''}
${code}
\`\`\`

المطلوب:
1. إرجاع الكود المُرقى والمعدل بالكامل بجودة إنتاجية عالية (Clean, Robust, High Performance).
2. ملخص موجز جداً (في 2-4 نقاط سريعة) لأهم التعديلات التي أجريتها ولماذا.
3. نصيحة عملية للتنفيذ أو فحص الـ Edge Cases.

أرجع النتيجة بصيغة JSON حصراً:
{
  "upgradedCode": "...",
  "changes": ["...", "..."],
  "tip": "..."
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    return res.json(parsed);
  } catch (error: any) {
    console.error("Upgrade code error:", error);
    return res.status(500).json({ error: error.message });
  }
});

// 2. Text-to-SQL & Supabase Query Optimizer
app.post("/api/gemini/text-to-sql", async (req, res) => {
  try {
    const { question, tableSchemas } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        sql: `SELECT 
  DATE_TRUNC('hour', created_at) AS trip_hour,
  COUNT(id) AS total_trips,
  AVG(surge_multiplier) AS avg_surge,
  SUM(fare_sar) AS total_revenue
FROM trips
WHERE created_at >= NOW() - INTERVAL '24 HOURS'
  AND status = 'completed'
GROUP BY 1
ORDER BY trip_hour DESC;`,
        explanation: "استعلام PostgreSQL محسن يقوم بتجميع الرحلات المكتملة خلال آخر 24 ساعة حسب الساعة، وحساب معدل الـ Surge وإجمالي الإيرادات دون إجهاد السيرفر.",
        indexRecommendation: "CREATE INDEX idx_trips_created_status ON trips (created_at DESC, status) INCLUDE (surge_multiplier, fare_sar);",
        riskLevel: "LOW",
        tip: "يعمل بنمط المساعد المحلي. لتفعيل استعلامات تفاعلية حية بـ Gemini 3.8 Flash، قم بضبط GEMINI_API_KEY.",
      });
    }

    const ai = getGeminiClient();

    const prompt = `
بصفتك مهندس قواعد بيانات PostgreSQL خبير في منصات النقل اللوجستي (مشاوير):
السؤال المطلوب من مدير التكنولوجيا:
"${question}"

مخطط الجداول المتاحة في قاعدة البيانات:
${tableSchemas || `
- trips (id uuid, captain_id uuid, passenger_id uuid, status text, pickup_lat float, pickup_lng float, fare_sar numeric, surge_multiplier numeric, created_at timestamptz, completed_at timestamptz)
- captains (id uuid, name text, phone text, status text, rating numeric, car_model text, total_trips int, is_active boolean, current_lat float, current_lng float)
- surge_zones (zone_id text, name text, current_multiplier numeric, active_demands int, active_captains int, updated_at timestamptz)
- api_logs (id uuid, endpoint text, status_code int, response_time_ms int, error_message text, created_at timestamptz)
`}

المطلوب:
1. كود استعلام PostgreSQL نقي ومحسن (SQL Query) جاهز للتنفيذ.
2. شرح مختصر في 2-3 أسطر لما يفعله الاستعلام.
3. توصية هندسية (Index recommendation) لتسريع هذا الاستعلام وتفادي الـ Full Table Scan في أوقات الذروة.

أرجع النتيجة بتنسيق JSON حصراً:
{
  "sql": "SELECT ...",
  "explanation": "...",
  "indexRecommendation": "CREATE INDEX ...",
  "riskLevel": "LOW | MEDIUM | HIGH"
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    return res.json(parsed);
  } catch (error: any) {
    console.error("Text-to-SQL error:", error);
    return res.status(500).json({ error: error.message });
  }
});

// 3. GitHub PR & Code Reviewer
app.post("/api/gemini/review-code", async (req, res) => {
  try {
    const { codeDiff, prTitle, author } = req.body;
    const ai = getGeminiClient();

    const prompt = `
أنت Lead Architect تفحص كوداً برمجياً لـ Pull Request في شركة مشاوير:
عنوان الـ PR: "${prTitle || 'تحديثات في منطق توزيع السائقين والـ WebSockets'}"
المطور: "${author || 'فريق Backend'}"

الكود / الـ Diff:
\`\`\`
${codeDiff}
\`\`\`

قم بمراجعة الكود بدقة وأعط تقييماً للمطور:
1. ملخص التغيير في سطرين.
2. الثغرات الأمنية ومشاكل الـ Concurrency أو Race Conditions أو الذاكرة.
3. التقييم النهائي للكود من 10 (Score).
4. قرار الدمج: APPROVED أو CHANGES_REQUESTED أو BLOCKED_CRITICAL.
5. تعليق تنفيذي موجه للمطور بأسلوب مهذب ومحترف.

أرجع النتيجة بصيغة JSON حصراً:
{
  "summary": "...",
  "score": 8.5,
  "verdict": "APPROVED",
  "securityIssues": ["..."],
  "performanceRisks": ["..."],
  "executiveComment": "..."
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    return res.json(parsed);
  } catch (error: any) {
    console.error("Review code error:", error);
    return res.status(500).json({ error: error.message });
  }
});

// 4. Google Meet & Drive Transcript Summarizer
app.post("/api/gemini/summarize-meeting", async (req, res) => {
  try {
    const { transcript, meetingTitle } = req.body;
    const ai = getGeminiClient();

    const prompt = `
حلل تفريغ اجتماع Google Meet التالي لشركة مشاوير الرقمية:
عنوان الاجتماع: "${meetingTitle || 'اجتماع التخطيط التقني لربع السنة'}"

التفريغ / الملاحظات:
"""
${transcript}
"""

المطلوب استخراجه بدقة لمدير التكنولوجيا:
1. ملخص تنفيذي مركز (Executive Summary) في 3 نقاط.
2. القرارات الحاسمة المتخذة (Key Decisions).
3. جدول المهام والمسؤوليات (Action Items) متضمناً: المهمة، اسم المسؤول، والموعد النهائي للتسليم.
4. المخاطر أو الـ Blockers المحتملة.
5. مسودة إيميل ملخص جاهز للإرسال لفريق العمل.

أرجع النتيجة بصيغة JSON:
{
  "summary": ["..."],
  "decisions": ["..."],
  "actionItems": [
    { "task": "...", "owner": "...", "deadline": "..." }
  ],
  "blockers": ["..."],
  "followUpEmail": "..."
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    return res.json(parsed);
  } catch (error: any) {
    console.error("Summarize meeting error:", error);
    return res.status(500).json({ error: error.message });
  }
});

// 5. Email Triage & Auto-Reply Generator
app.post("/api/gemini/triage-email", async (req, res) => {
  try {
    const { emailContent, sender, subject } = req.body;
    const ai = getGeminiClient();

    const prompt = `
أنت المساعد التنفيذي لـ CTO مشاوير. وصلك هذا الإيميل:
المرسل: "${sender || 'vendor@paymentgateway.com'}"
الموضوع: "${subject || 'Urgent: API Migration & Deprecation Notice'}"

نص الإيميل:
"""
${emailContent}
"""

قم بتحليله واستخراج:
1. مستوى الأهمية: P1_CRITICAL (طوارئ/توقف)، P2_HIGH (مهم بمهلة قريبة)، P3_MEDIUM (دوري)، P4_LOW (معلوماتي).
2. التصنيف: (بوابات الدفع، خرائط وتكاليف، سيرفرات وبنية تحتية، شراكات وموردين، إداري).
3. ملخص الإيميل في سطرين.
4. الإجراء المقترح على مدير التكنولوجيا (Next Action).
5. رد رسمي احترافي مقترح بالعربية أو الإنجليزية حسب لغة الإيميل.

أرجع JSON:
{
  "urgency": "P1_CRITICAL",
  "category": "بوابات الدفع",
  "summary": "...",
  "suggestedAction": "...",
  "draftReply": "..."
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    return res.json(parsed);
  } catch (error: any) {
    console.error("Triage email error:", error);
    return res.status(500).json({ error: error.message });
  }
});

// 6. Morning Executive Audio Briefing (CTO 2-Minute Podcast)
app.post("/api/gemini/briefing", async (req, res) => {
  try {
    const { fleetStatus, openPRCount, incidentCount } = req.body;
    const ai = getGeminiClient();

    const scriptPrompt = `
اكتب سيناريو البودكاست الصباحي التنفيذي (Daily 2-Minute CTO Podcast) لمدير التكنولوجيا في شركة مشاوير لليوم:
- حالة الأسطول: ${fleetStatus || 'مستقرة، 1,240 كابتن أونلاين، 0 انقطاع في الـ Dispatching'}
- الـ PRs العالقة: ${openPRCount || '3 PRs بحاجة لمراجعة كود'}
- تنبيهات النظام: ${incidentCount || 'لا توجد حوادث حرجة، استهلاك Supabase CPU بنسبة 28%'}

المطلوب:
نص إذاعي صباحي دافئ واحترافي بنبرة مساعد ذكي، يبدأ بالتحية الصباحية لمدير التكنولوجيا، ويلخص في 4 فقرات سريعة:
1. نبض المنصة اللحظي (Platform Pulse).
2. أهم أولويات اليوم التقنية.
3. التحديثات والاجتماعات المقررة.
4. نصيحة معمارية استباقية.

أرجع JSON:
{
  "headline": "...",
  "audioScript": "...",
  "keyHighlights": ["...", "...", "..."],
  "recommendedFocus": "..."
}
`;

    const scriptResponse = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: scriptPrompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(scriptResponse.text || "{}");
    return res.json(parsed);
  } catch (error: any) {
    console.error("Briefing error:", error);
    return res.status(500).json({ error: error.message });
  }
});

// 7. Telegram Bot API Integration Helper & Webhook Receiver
app.post("/api/telegram/test-bot", async (req, res) => {
  const { botToken } = req.body;
  const token = botToken || process.env.TELEGRAM_BOT_TOKEN;

  if (!token) {
    return res.status(400).json({ error: "لم يتم تقديم رمز البوت (Bot Token)" });
  }

  try {
    const telegramRes = await fetch(`https://api.telegram.org/bot${token}/getMe`);
    const data = await telegramRes.json();
    if (data.ok) {
      return res.json({
        success: true,
        bot: data.result,
      });
    } else {
      return res.status(400).json({
        success: false,
        description: data.description,
      });
    }
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// Send Message via Telegram
app.post("/api/telegram/send-message", async (req, res) => {
  const { botToken, chatId, text, parseMode = "Markdown" } = req.body;
  const token = botToken || process.env.TELEGRAM_BOT_TOKEN;

  if (!token || !chatId || !text) {
    return res.status(400).json({ error: "Token, Chat ID, and Text are required" });
  }

  try {
    const telegramRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: parseMode,
      }),
    });
    const data = await telegramRes.json();
    return res.json(data);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// Set Webhook to this exact Cloud Run URL
app.post("/api/telegram/set-webhook", async (req, res) => {
  const { botToken, hostUrl } = req.body;
  const token = botToken || process.env.TELEGRAM_BOT_TOKEN;
  const appUrl = hostUrl || process.env.APP_URL;

  if (!token) {
    return res.status(400).json({ error: "Bot Token is required" });
  }
  if (!appUrl) {
    return res.status(400).json({ error: "Host URL is required to set webhook" });
  }

  const webhookEndpoint = `${appUrl.replace(/\/$/, "")}/api/telegram/webhook?token=${encodeURIComponent(token.slice(0, 10))}`;

  try {
    const telegramRes = await fetch(`https://api.telegram.org/bot${token}/setWebhook`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: webhookEndpoint,
        allowed_updates: ["message", "callback_query"],
      }),
    });
    const data = await telegramRes.json();
    return res.json({
      ...data,
      webhookUrl: webhookEndpoint,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// Real Telegram Webhook Receiver
app.post("/api/telegram/webhook", async (req, res) => {
  res.status(200).send("OK");

  try {
    const update = req.body;
    console.log("Received Telegram Webhook Update:", JSON.stringify(update));

    const message = update?.message;
    if (!message || !message.text) return;

    const chatId = message.chat?.id;
    const userText = message.text;
    const senderName = message.from?.first_name || "CTO";

    // Call Gemini to generate Hypatia's reply
    const ai = getGeminiClient();
    const prompt = `
الرسالة الواردة من تليجرام من صاحب التطبيقات والمشاريع (${senderName}):
"${userText}"

قم بالرد عليه كـ "هيباتيا" (Hypatia) - المساعد التقني والبرمجي الشخصي لإدارة مشاريعه وغرف العمليات.
اجعل الرد مناسباً للتيليجرام: عملي، سريع، مفيد، وواضح بدون أي رسميات مصطنعة أو دعاية.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        systemInstruction: HYPATIA_SYSTEM_PROMPT,
      },
    });

    const replyText = response.text || "تم استلام رسالتك وجاري متابعة العمليات.";

    telegramActivityLog.unshift({
      id: String(Date.now()),
      time: new Date().toLocaleTimeString("ar-SA"),
      sender: senderName,
      text: userText,
      reply: replyText,
    });
    if (telegramActivityLog.length > 50) telegramActivityLog.pop();

    // If we have token, reply back
    const token = process.env.TELEGRAM_BOT_TOKEN;
    if (token && chatId) {
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: replyText,
        }),
      });
    }
  } catch (err) {
    console.error("Webhook processing error:", err);
  }
});

// Get Telegram Activity Log
app.get("/api/telegram/logs", (_req, res) => {
  res.json({ logs: telegramActivityLog });
});

// ==============================================================================
// Google Drive Integration Endpoints (Using client-supplied Bearer token)
// ==============================================================================

// Helper to call Google Drive v3 REST API with Bearer token
async function callDriveApi(endpoint: string, token: string, options: RequestInit = {}) {
  const url = endpoint.startsWith("http") ? endpoint : `https://www.googleapis.com/drive/v3${endpoint}`;
  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
    ...(options.headers as Record<string, string> || {}),
  };
  const response = await fetch(url, { ...options, headers });
  if (!response.ok) {
    const errorText = await response.text();
    let parsed: any = null;
    try {
      parsed = JSON.parse(errorText);
    } catch {}
    const message = parsed?.error?.message || errorText;
    const err: any = new Error(`Drive API error (${response.status}): ${message}`);
    err.status = response.status;
    err.details = parsed || errorText;
    throw err;
  }
  return response.json();
}

// 0. Create Single "Mashweer_Digital_Platforms" Folder and Ecosystem Hierarchy on Drive
app.post(["/api/drive/sync-mashweer-drive", "/api/drive/create-noub-single"], async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Missing or invalid authorization header" });
    }
    const token = authHeader.replace("Bearer ", "").trim();

    // 1. Search or create Root folder "Mashweer_Digital_Platforms"
    const searchRoot = await callDriveApi(
      "/files?q=" + encodeURIComponent("name = 'Mashweer_Digital_Platforms' and mimeType = 'application/vnd.google-apps.folder' and trashed = false") + "&fields=files(id, name, webViewLink)",
      token
    );

    let masterFolder = searchRoot.files && searchRoot.files.length > 0 ? searchRoot.files[0] : null;
    if (!masterFolder) {
      masterFolder = await callDriveApi("/files?fields=id,name,webViewLink", token, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Mashweer_Digital_Platforms",
          mimeType: "application/vnd.google-apps.folder",
          description: "منظومة شركة مشاوير للمنصات الرقمية ومقر المعادي والتطبيقات والشبكات",
        }),
      });
    }

    const masterFolderId = masterFolder.id;

    // Helper to get or create a subfolder
    async function getOrCreateFolder(name: string, parentId: string) {
      const q = `name = '${name}' and '${parentId}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`;
      const search = await callDriveApi(`/files?q=${encodeURIComponent(q)}&fields=files(id, name, webViewLink)`, token);
      if (search.files && search.files.length > 0) {
        return search.files[0];
      }
      return await callDriveApi("/files?fields=id,name,webViewLink", token, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          mimeType: "application/vnd.google-apps.folder",
          parents: [parentId],
        }),
      });
    }

    // Helper to upload or update a file
    async function uploadDriveFile(filename: string, parentId: string, mimeType: string, content: string) {
      const q = `name = '${filename}' and '${parentId}' in parents and trashed = false`;
      const search = await callDriveApi(`/files?q=${encodeURIComponent(q)}&fields=files(id, name)`, token);
      
      const boundary = "-------314159265358979323846";
      const delimiter = "\r\n--" + boundary + "\r\n";
      const closeDelim = "\r\n--" + boundary + "--";

      const metadata = {
        name: filename,
        mimeType: mimeType,
        parents: [parentId],
      };

      const multipartRequestBody =
        delimiter +
        "Content-Type: application/json; charset=UTF-8\r\n\r\n" +
        JSON.stringify(metadata) +
        delimiter +
        `Content-Type: ${mimeType}; charset=UTF-8\r\n\r\n` +
        content +
        closeDelim;

      if (search.files && search.files.length > 0) {
        const fileId = search.files[0].id;
        for (let i = 1; i < search.files.length; i++) {
          try {
            await callDriveApi(`/files/${search.files[i].id}`, token, { method: "DELETE" });
          } catch (e) {
            console.warn("Could not delete duplicate file", e);
          }
        }
        const uploadRes = await fetch(
          `https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=media`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": `${mimeType}; charset=UTF-8`,
            },
            body: content,
          }
        );
        return await uploadRes.json();
      } else {
        const uploadRes = await fetch(
          "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": `multipart/related; boundary=${boundary}`,
            },
            body: multipartRequestBody,
          }
        );
        return await uploadRes.json();
      }
    }

    // 2. Create structured Enterprise Mashweer Folders ONLY
    // Level 1: 01_PROJECTS_ECOSYSTEM
    const fEcosystem = await getOrCreateFolder("01_PROJECTS_ECOSYSTEM", masterFolderId);
    
    // 4B Deep Subfolders
    const f4b = await getOrCreateFolder("01_4B_PASSENGER", fEcosystem.id);
    const f4bBuilds = await getOrCreateFolder("01_SOURCE_CODE_AND_BUILDS", f4b.id);
    const f4bFigma = await getOrCreateFolder("02_FIGMA_AND_DESIGNS", f4b.id);
    const f4bTasks = await getOrCreateFolder("03_OWNER_REQUESTS_AND_TASKS", f4b.id);
    const f4bMeetings = await getOrCreateFolder("04_MEETINGS_AND_LINKS", f4b.id);
    const f4bBackups = await getOrCreateFolder("05_BACKUPS_AND_DATABASE", f4b.id);
    const f4bLtra = await getOrCreateFolder("06_GOVERNMENT_LICENSING_LTRA", f4b.id);
    const f4bWe = await getOrCreateFolder("07_TELECOM_EGYPT_WE_HOSTING_AND_VPN", f4b.id);
    const f4bSms = await getOrCreateFolder("08_EGYPTIAN_SMS_OTP_GATEWAY", f4b.id);
    const f4bOrigin = await getOrCreateFolder("09_CERTIFICATES_OF_ORIGIN_AND_DOMAINS", f4b.id);
    
    // WiKaLa Deep Subfolders
    const fWekala = await getOrCreateFolder("02_WIKALA_AGENCY_FLEET", fEcosystem.id);
    const fWekalaApk = await getOrCreateFolder("01_APK_RELEASES", fWekala.id);
    const fWekalaDash = await getOrCreateFolder("02_DASHBOARD_SPECS", fWekala.id);
    const fWekalaFigma = await getOrCreateFolder("03_FIGMA_AND_DESIGNS", fWekala.id);
    const fWekalaTasks = await getOrCreateFolder("04_OWNER_REQUESTS_AND_TASKS", fWekala.id);
    const fWekalaMeetings = await getOrCreateFolder("05_MEETINGS_AND_LINKS", fWekala.id);
    const fWekalaCloud = await getOrCreateFolder("06_CLOUD_AND_CLOUDINARY", fWekala.id);
    const fWekalaOrigin = await getOrCreateFolder("07_CERTIFICATES_OF_ORIGIN_AND_DOMAINS", fWekala.id);

    // Daro Deep Subfolders
    const fDaro = await getOrCreateFolder("03_DARO_CARGO_LOGISTICS", fEcosystem.id);
    const fDaroBuilds = await getOrCreateFolder("01_SOURCE_CODE_AND_BUILDS", fDaro.id);
    const fDaroBarcode = await getOrCreateFolder("02_BARCODE_AND_SHIPPING_SPECS", fDaro.id);
    const fDaroFigma = await getOrCreateFolder("03_FIGMA_AND_DESIGNS", fDaro.id);
    const fDaroTasks = await getOrCreateFolder("04_OWNER_REQUESTS_AND_TASKS", fDaro.id);
    const fDaroMeetings = await getOrCreateFolder("05_MEETINGS_AND_LINKS", fDaro.id);
    const fDaroCloud = await getOrCreateFolder("06_CLOUD_AND_STORAGE", fDaro.id);
    const fDaroOrigin = await getOrCreateFolder("07_CERTIFICATES_OF_ORIGIN_AND_DOMAINS", fDaro.id);

    // Mashweer Captain Driver
    const fDriver = await getOrCreateFolder("04_MASHWEER_CAPTAIN_DRIVER", fEcosystem.id);
    const fDriverBuilds = await getOrCreateFolder("01_SOURCE_CODE_AND_BUILDS", fDriver.id);
    const fDriverGps = await getOrCreateFolder("02_GPS_AND_WEBSOCKETS", fDriver.id);

    // Kaggle & UCP-LLM Research (White Lion Research)
    const fKaggle = await getOrCreateFolder("05_KAGGLE_AND_UCP_LLM_RESEARCH", fEcosystem.id);
    const fKagglePaper = await getOrCreateFolder("01_PAPER_TRACK_AND_INVITATION", fKaggle.id);
    const fKaggleCode = await getOrCreateFolder("02_PROTOCOL_ENGINE_AND_CODE", fKaggle.id);

    // Level 1: 02_MAADI_HEADQUARTERS_INFRASTRUCTURE
    const fMaadi = await getOrCreateFolder("02_MAADI_HEADQUARTERS_INFRASTRUCTURE", masterFolderId);
    const fMaadiDell = await getOrCreateFolder("01_SERVERS_DELL_R640_PLATINUM", fMaadi.id);
    const fMaadiNet = await getOrCreateFolder("02_NETWORKS_CISCO_AND_PERLA_27U", fMaadi.id);
    const fMaadiWorkstations = await getOrCreateFolder("03_WORKSTATIONS_HP_Z440", fMaadi.id);
    const fMaadiCctv = await getOrCreateFolder("04_CCTV_CAMERAS_16_IP", fMaadi.id);
    const fMaadiWe = await getOrCreateFolder("05_TELECOM_EGYPT_WE_FIBER_AND_VPN", fMaadi.id);

    // Level 1: 03_CENTRAL_CONTRACTS_AND_VENDORS
    const fContracts = await getOrCreateFolder("03_CENTRAL_CONTRACTS_AND_VENDORS", masterFolderId);
    const fLegalLawyer = await getOrCreateFolder("01_LEGAL_DOSSIER_AND_LAWYER", fContracts.id);
    const fLtraDecree = await getOrCreateFolder("02_LTRA_LAW_87_2018", fContracts.id);
    const fZohoEmails = await getOrCreateFolder("03_ZOHO_MAIL_5_FREE_ACCOUNTS", fContracts.id);

    // Level 1: 04_CENTRAL_QUOTATIONS_AND_PURCHASE_ORDERS
    const fQuotations = await getOrCreateFolder("04_CENTRAL_QUOTATIONS_AND_PURCHASE_ORDERS", masterFolderId);
    const fQuotesTaxEta = await getOrCreateFolder("01_VERIFIED_TAX_INVOICES_ETA", fQuotations.id);
    const fQuotesWePo = await getOrCreateFolder("02_TELECOM_EGYPT_WE_OFFICIAL_POS", fQuotations.id);
    const fQuotesLedger = await getOrCreateFolder("03_SUBSCRIPTIONS_AND_PURCHASES_LEDGER", fQuotations.id);

    // Level 1: 05_MASTER_KNOWLEDGE_VAULT
    const fVault = await getOrCreateFolder("05_MASTER_KNOWLEDGE_VAULT", masterFolderId);

    // 3. Upload Essential Root Files to Mashweer_Digital_Platforms
    await uploadDriveFile("MASHWEER_MASTER_ECOSYSTEM_MANIFEST.txt", masterFolderId, "text/plain", `MASHWEER ENTERPRISE DIGITAL PLATFORMS
Root Directory: Mashweer_Digital_Platforms
HQ: Maadi Operations Center, Cairo, Egypt
Systems: 4B Passenger, WeKaLa Fleet, Daro Logistics, Captain Driver
Infrastructure: Dell PowerEdge R640 Platinum, Perla 27U Rack, Cisco 3850 PoE, HP Z440 Workstations
Telecom: Telecom Egypt (WE) Dedicated MPLS/L3VPN & Sovereign Cloud Node`);

    await uploadDriveFile("MASHWEER_SYSTEM_DEPENDENCIES_MAP.json", fVault.id, "application/json", JSON.stringify({
      ecosystem: "Mashweer Digital Platforms",
      headquarters: "Maadi, Cairo",
      applications: ["4B Passenger", "WeKaLa Agency", "Daro Cargo", "Mashweer Captain Driver"],
      infrastructure: {
        server: "DELL PowerEdge R640 Platinum (48 Cores / 96 Threads)",
        switch: "Cisco Catalyst 3850 48-Port PoE+",
        rack: "Perla 27U Depth 1000mm",
        workstations: "2x HP Z440 Xeon E5-2697v4",
        cctv: "16x IP Cameras + 16CH NVR"
      },
      telecom: {
        provider: "Telecom Egypt (WE)",
        vpnOffer: "24Mbps Fiber Aggregation + 6x 4Mbps L3VPN Branches",
        cloudServer: "Dedicated Sovereign Node at Smart Village Datacenter"
      }
    }, null, 2));

    // Upload Official Telecom Egypt WE VPN Offer Documentation
    await uploadDriveFile("WE_L3VPN_AND_FIBER_CONNECTIVITY_PO_360000EGP.md", fMaadiWe.id, "text/markdown", `# عرض وأمر شراء خطوط الربط المجمعة والـ L3VPN بالفايبر - الشركة المصرية للاتصالات (WE)
**الجهة:** الشركة المصرية للاتصالات (Telecom Egypt - WE)  
**مسؤول الحساب:** المهندس أحمد غريب (Ahmed Gharib - WE Account Manager)  
**العميل:** شركة مشاوير للمنصات الرقمية (Mashawir)  
**المشرفون:** م/ سامح ياسين (CTO & Systems Lead) • م/ عماد الشرقاوي (Senior Technical Consultant)  
**رقم الحساب التعاقدي:** Account # NEW  
**القيمة الإجمالية:** 360,000.00 جنيه مصري سنوياً (YRC) تُسدد ربع سنوياً مقدماً بعد التركيب (90,000 ج.م كل 3 أشهر)  
**مدة التوريد والتركيب:** 4 إلى 6 أسابيع من استلام الأوراق الرسمية المعتمدة  

### تفاصيل خطوط الربط:
1. **خط الربط التجميعي الرئيسي (VPN HQ – DC):**
   - سعة: 24Mbps L3VPN عبر الألياف الضوئية (Fiber).
   - المسار: ربط داتا سنتر مقر المعادي المركزي بسيرفرات مشاوير السحابية بداتا سنتر القرية الذكية (WE Data SV PVC from CAF Cloud).
2. **خطوط الربط الفرعية (Sections 1 to 6):**
   - 6 خطوط L3VPN فرعية بسرعة 4Mbps تحميل ورفع متماثل لكل خط.
   - قيمة كل خط: 60,000.00 ج.م سنوياً (إجمالي 360,000 ج.م).
3. **التكامل مع المتطلبات السيادية (LTRA):**
   - مطابقة لاشتراطات القانون رقم 87 لسنة 2018 وقرار رئيس مجلس الوزراء رقم 2180 لسنة 2019 لربط بيانات الرحلات والتتبع.`);

    await uploadDriveFile("WE_L3VPN_AND_FIBER_CONNECTIVITY_PO_360000EGP.md", f4bWe.id, "text/markdown", `# عرض وأمر شراء خطوط الربط والـ VPN لتطبيق فور بي 4B ومقر المعادي - المصرية للاتصالات WE
المستند الرسمي المعتمد لخطوط الربط الشبكي المشفرة من المصرية للاتصالات لخدمة منصة 4B.`);

    // Upload Dell Server Tax Invoice Record
    await uploadDriveFile("QTS_DELL_R640_AND_HP_Z440_TAX_INVOICE_ETA_96295EGP.md", fMaadiDell.id, "text/markdown", `# الفاتورة الضريبية الإلكترونية المعتمدة (ETA) - شراء سيرفر ديل بلاتينيوم وجهازي HP Z440
**الرقم الإلكتروني:** 7ZYZDKGHRVSDN70R4SP81F3M10 (رقم داخلي: 1169)  
**المورد:** سيرفر للخدمات التكنولوجيه كيو تى اس (س.ت: 662709268#)  
**المشتري:** شركة مشاوير للمنصات الرقمية (س.ت: 757315518#)  
**إجمالي القيمة المسددة:** 96,295.80 جنيه مصري شاملة 14% ضريبة القيمة المضافة.`);

    // Upload Zoho Mail 5 Free Accounts Setup
    await uploadDriveFile("ZOHO_MAIL_5_FREE_OFFICIAL_ACCOUNTS.md", fZohoEmails.id, "text/markdown", `# الحسابات الرسمية المعتمدة لنطاق مشاوير (mashweer.com.eg) - زوهو ميل المجاني
تم تفعيل وتأكيد استلام الحسابات الخمسة الرسمية بنجاح 100% بدون أي تكاليف شهرية:
1. **admin@mashweer.com.eg** (الإدارة العامة والتحكم)
2. **support@mashweer.com.eg** (الدعم الفني والعمليات)
3. **info@mashweer.com.eg** (الاستفسارات والمعلومات العامة)
4. **sales@mashweer.com.eg** (المبيعات والتسويق)
5. **contact@mashweer.com.eg** (التواصل الرسمي والشراكات)
* ملاحظة: تم استبعاد إيميل HR للاكتفاء بالباقة المجانية مدى الحياة من Zoho Mail (5 حسابات مجانية).`);

    // Upload Kaggle Research Paper note
    await uploadDriveFile("UCP_LLM_AUTONOMOUS_AGENT_PAPER_TRACK.md", fKagglePaper.id, "text/markdown", `# UCP-LLM Protocol & Kaggle Developer Agent Research Track
**Author:** Sameh Yassin (CTO & AI Systems Architect)  
**Model:** Gemma 4 Autonomous Offline Agent on Consumer Hardware  
**Target:** Kaggle Competition (Deadline 25 Nov 2026 - $100k Prize Pool) & Paper Track  
**Concept:** User Context Protocol for Large Language Models.`);

    return res.json({
      success: true,
      folder: masterFolder,
      folderLink: masterFolder.webViewLink || `https://drive.google.com/drive/folders/${masterFolderId}`,
      message: `تم إنشاء وتحديث هيكل مجلدات مشاوير الرقمية (Mashweer_Digital_Platforms) بالكامل على Google Drive مع عروض الـ VPN والعتاد وبدون أي مجلدات قديمة.`,
    });
  } catch (err: any) {
    const errMsg = err?.message || "";
    const is403 = err?.status === 403 || errMsg.includes("403") || errMsg.includes("accessNotConfigured") || errMsg.includes("PERMISSION_DENIED") || errMsg.includes("insufficient");
    console.warn("Google Drive Sync Notice:", is403 ? "403 Insufficient Scopes or API Not Configured" : errMsg);

    if (is403) {
      return res.status(200).json({
        success: false,
        is403: true,
        error: "Google Drive API: تم رصد نقص في صلاحيات النقل (403: Insufficient Scopes / Access Not Configured). سبب ذلك يحتاج للموافقة على صلاحيات Drive بالكامل أو تفعيل الخدمة. يمكنك إما إعادة تسجيل الدخول ومنح الصلاحية أو استخدام السجل الداخلي المحدث.",
        details: err?.details || errMsg,
      });
    }

    return res.status(200).json({
      success: false,
      error: errMsg || "Failed to create on Google Drive"
    });
  }
});

// Download Complete NOUB Master Archive (ZIP)
app.get("/api/system/download-noub-zip", async (_req, res) => {
  try {
    const archive = typeof archiver === 'function' 
      ? archiver("zip", { zlib: { level: 9 } }) 
      : new archiver.ZipArchive({ zlib: { level: 9 } });

    res.attachment("NOUB_MASTER_SYSTEM_ARCHIVE.zip");
    res.setHeader("Content-Type", "application/zip");

    archive.on("error", (err) => {
      console.error("Archive error:", err);
      res.status(500).send({ error: err.message });
    });

    archive.pipe(res);

    const rootFiles = [
      "NOUB_MASTER_SYSTEM.txt",
      "projects_manifest.json",
      "ALL_PROJECTS_LINKS.csv",
      "MASHAWER_CORE_TASKS_INVENTORY.json",
      "SYSTEM_RELATIONSHIP_DIAGRAM.json",
      "MASHAWER_OFFERS_AND_QUOTATIONS.json",
      "4B_GORIDE_TECHNICAL_HANDOVER.md",
      "NOUB_WE_QUOTATION_SPECIFICATIONS.json",
      "MAADI_HQ_INFRASTRUCTURE_AND_HARDWARE.md",
      "MASHAWER_VENDORS_AND_OPERATIONS.md",
      "MASHAWER_TEAM_AND_ORG_CHART.md",
      "MASHAWER_TECHNICAL_AUDIT_PLAYBOOK.md",
      "MASHAWER_FIGMA_TECHNICAL_AUDIT_REPORT.md",
      "subscriptions.csv",
    ];

    for (const f of rootFiles) {
      const filePath = path.join(process.cwd(), f);
      archive.file(filePath, { name: `NOUB/${f}` });
    }

    // Append standard directory structure documents
    archive.append(`# 4B Passenger Build Specs\nTarget: Android 14+ / iOS 17+\nStatus: APK under field test`, { name: "NOUB/01_MASHWEER_FLEET/01_4B_PASSENGER/01_SOURCE_CODE_AND_BUILDS/BUILD_AND_RELEASE_SPECS.md" });
    archive.append(`# LTRA Government Licensing Dossier\nLaw 87/2018 & Decree 2180/2019\nMandate: Direct leased line with Telecom Egypt WE`, { name: "NOUB/01_MASHWEER_FLEET/01_4B_PASSENGER/06_GOVERNMENT_LICENSING_LTRA/LTRA_OFFICIAL_DIRECTIVE.md" });
    archive.append(`# WiKaLa Agency APK & Vercel Dashboard\nDashboard: https://wikala-admin-panel.vercel.app/login\nStatus: Fully audited by Sameh`, { name: "NOUB/01_MASHWEER_FLEET/02_WIKALA_AGENCY_APK/01_APK_RELEASES/APK_TESTING_AND_REVISION_LOG.md" });
    archive.append(`# Daro Super App Scope\nFigma: 70% complete\nScope: Multi-modal cargo and logistics`, { name: "NOUB/01_MASHWEER_FLEET/03_DARO_SUPER_APP/01_SOURCE_CODE_AND_BUILDS/DARO_ARCHITECTURE_OVERVIEW.md" });
    archive.append(`# Maadi Headquarters & Local Server Vault\nPCS: 8x Dell OptiPlex 3090\nRack: 140cm\nCameras: Unified IP CCTV by Eng. Ali\nLead: Sameh & Eng. Emad El Sharkawy (3-month sprint)`, { name: "NOUB/05_MAADI_HEADQUARTERS/01_HARDWARE_AND_PCS/MAADI_HQ_INFRASTRUCTURE.md" });
    archive.append(`# Agouza Grill Restaurant (مطعم المشويات بالعجوزة)\nLead: Mr. Hany & Abu Khaled (Company Owner)\nPartner: Eng. Ali\nStatus: Price quotes received for POS system & CCTV cameras`, { name: "NOUB/06_SIDE_VENTURES/01_RESTAURANT_POS/RESTAURANT_AGOUZA_SYSTEM_AND_SURVEILLANCE.md" });

    await archive.finalize();
  } catch (error: any) {
    console.error("ZIP Archive error:", error);
    if (!res.headersSent) {
      res.status(500).json({ error: "Failed to generate zip archive" });
    }
  }
});

// 1. Setup or Check NOUB_IDLE Master Structure
app.post("/api/drive/setup-noub-idle", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Missing or invalid authorization header" });
    }
    const token = authHeader.replace("Bearer ", "").trim();

    // Check if NOUB_IDLE folder already exists
    const searchRoot = await callDriveApi(
      "/files?q=" + encodeURIComponent("name = 'NOUB_IDLE' and mimeType = 'application/vnd.google-apps.folder' and trashed = false") + "&fields=files(id, name, webViewLink)",
      token
    );

    let masterFolder = searchRoot.files && searchRoot.files.length > 0 ? searchRoot.files[0] : null;

    // If not exists, create NOUB_IDLE
    if (!masterFolder) {
      masterFolder = await callDriveApi(
        "/files",
        token,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: "NOUB_IDLE",
            mimeType: "application/vnd.google-apps.folder",
            description: "المجلد الرئيسي الشامل لمشاريع منظومة نوب ومشاوير",
          }),
        }
      );
    }

    const masterFolderId = masterFolder.id;

    // Helper to find or create subfolder
    async function getOrCreateSubfolder(name: string, parentId: string) {
      const q = `name = '${name}' and '${parentId}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`;
      const search = await callDriveApi(`/files?q=${encodeURIComponent(q)}&fields=files(id, name, webViewLink)`, token);
      if (search.files && search.files.length > 0) {
        return search.files[0];
      }
      return await callDriveApi(
        "/files",
        token,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            mimeType: "application/vnd.google-apps.folder",
            parents: [parentId],
          }),
        }
      );
    }

    // Create / Verify: مشاوير & MINE_APPS
    const mashweerFolder = await getOrCreateSubfolder("مشاوير", masterFolderId);
    const mineAppsFolder = await getOrCreateSubfolder("MINE_APPS", masterFolderId);

    // Subfolders inside مشاوير: 4B, WEKALA, DARO
    const subProjectsMashweer = ["فور_بي_4B", "وكالة_WEKALA", "دارو_DARO"];
    const mashweerSubfolders = [];
    for (const name of subProjectsMashweer) {
      const sub = await getOrCreateSubfolder(name, mashweerFolder.id);
      mashweerSubfolders.push({ name, id: sub.id, link: sub.webViewLink });
    }

    // Subfolders inside MINE_APPS: نوب سبورتس، نوب الأساسي، غرفة التداول، لعبة نوب، هيباتيا، باي كور، أكاديمي برو
    const subProjectsMine = [
      "نوب_سبورتس_NOUB_Sports",
      "نوب_الأساسي_NOUB_Main",
      "غرفة_التداول_Trading_Ops",
      "لعبة_نوب_NOUB_Game",
      "هيباتيا_Hypatia_Ops",
      "بوابة_الدفع_PayCore",
      "أكاديمي_برو_Academy_Pro",
    ];
    const mineSubfolders = [];
    for (const name of subProjectsMine) {
      const sub = await getOrCreateSubfolder(name, mineAppsFolder.id);
      mineSubfolders.push({ name, id: sub.id, link: sub.webViewLink });
    }

    // Helper to upload or update a file (Markdown or Text)
    async function createOrUpdateTextFile(filename: string, parentId: string, content: string) {
      const q = `name = '${filename}' and '${parentId}' in parents and trashed = false`;
      const search = await callDriveApi(`/files?q=${encodeURIComponent(q)}&fields=files(id, name)`, token);
      
      const metadata = {
        name: filename,
        mimeType: "text/markdown",
        parents: [parentId],
      };

      // Multipart upload
      const boundary = "-------314159265358979323846";
      const delimiter = "\r\n--" + boundary + "\r\n";
      const closeDelim = "\r\n--" + boundary + "--";

      const multipartRequestBody =
        delimiter +
        "Content-Type: application/json; charset=UTF-8\r\n\r\n" +
        JSON.stringify(metadata) +
        delimiter +
        "Content-Type: text/markdown; charset=UTF-8\r\n\r\n" +
        content +
        closeDelim;

      if (search.files && search.files.length > 0) {
        // Update existing file content
        const fileId = search.files[0].id;
        const uploadRes = await fetch(
          `https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=media`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "text/markdown; charset=UTF-8",
            },
            body: content,
          }
        );
        return await uploadRes.json();
      } else {
        // Create new file
        const uploadRes = await fetch(
          "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": `multipart/related; boundary=${boundary}`,
            },
            body: multipartRequestBody,
          }
        );
        return await uploadRes.json();
      }
    }

    // Create Root README.md in NOUB_IDLE
    const rootReadme = `# دليل المستودع المركزي: NOUB_IDLE (نوب ومشاوير)
المشرف العام: هيباتيا (Hypatia Ops)
التاريخ: ${new Date().toLocaleDateString("ar-EG")}

---

## 📌 نبذة سريعة عن المستودع
تم تصميم هذا المجلد ليكون المرجع والذاكرة المباشرة لأي نموذج ذكاء اصطناعي (أو مطور) لفهم الموقف التشغيلي الحقيقي لكافة المشاريع دون الحاجة لإعادة سرد القصة.

## 📂 الهيكلة والمجلدات الفرعية:
1. \`مشاوير/\`: يحتوي على مشاريع النقل والخدمات اللوجستية المشتركة:
   - \`فور_بي_4B/\`: تطبيق نقل الركاب والأسطول (تم استلام APK + Dashboard).
   - \`وكالة_WEKALA/\`: نظام الوكلاء ومكاتب التوزيع (APK تصميم فقط - Dashboard قيد التطوير).
   - \`دارو_DARO/\`: الشحن اللوجستي بين المحافظات وتتبع الباركود.

2. \`MINE_APPS/\`: يحتوي على المنظومات الخاصة والمشاريع التكنولوجية:
   - \`نوب_سبورتس_NOUB_Sports/\`: إدارة الأكاديميات والبطولات الرياضية.
   - \`نوب_الأساسي_NOUB_Main/\`: البوابة المركزية والهوية الرقمية.
   - \`غرفة_التداول_Trading_Ops/\`: ربط البورصة ومصر للمقاصة وخطوط الربط.
   - \`لعبة_نوب_NOUB_Game/\`: لعبة الألغاز والمقابر الحضارية المصرية.
   - \`هيباتيا_Hypatia_Ops/\`: محرك العمليات وإعداد مذكرات الذكاء الاصطناعي.
   - \`بوابة_الدفع_PayCore/\`: بوابات الدفع والمحافظ والربط البنكي.
   - \`أكاديمي_برو_Academy_Pro/\`: قياس أداء ولياقة اللاعبين الصاعدين.

---
## 🤖 تعليمات القراءة السريعة لنماذج الذكاء الاصطناعي:
- ابدأ بقراءة ملف \`STATUS_MATRIX.md\` الموجود هنا لمعرفة آخر موقف لكل مشروع.
- عند إعداد برومبت أو توجيه كود لمشروع محدد، ادخل على ملف \`PROJECT_BRIEF.md\` داخل مجلد المشروع المطلوب.
`;

    await createOrUpdateTextFile("README.md", masterFolderId, rootReadme);

    // Create Matrix File
    const matrixContent = `# مصفوفة الموقف التشغيلي لجميع المشاريع (STATUS_MATRIX)
تاريخ التحديث: ${new Date().toLocaleString("ar-EG")}

| الكود | اسم المشروع | التصنيف | حالة تطبيق الموبايل (APK) | حالة لوحة التحكم (Dashboard) | الواجهات |
|:---:|:---|:---:|:---|:---|:---:|
| #001 | فور بي (4B) | مشاوير | ✅ استلمنا الـ APK للتجربة الميدانية | ✅ استلمنا الداش بورد للعمليات | فجما 95% |
| #002 | وكالة (WeKaLa) | مشاوير | 📱 استلمنا APK واجهات فقط | ⏳ لم نستلم الداش بورد بعد | فيجما 80% |
| #003 | دارو (Daro) | مشاوير | ⏳ في انتظار رفع نسخة الباركود | 📐 قيد التصميم الهندسي | فيجما 70% |
| #004 | نوب سبورتس | MINE_APPS | ✅ نسخة v1.0.0-dev قيد التجربة | ✅ الداش بورد جاهز في الإنتاج | فيجما + كود 95% |
| #005 | نوب الأساسي | MINE_APPS | 🌐 منصة ويب PWA | ✅ لوحة العضويات في الإنتاج | كود مباشر 100% |
| #006 | غرفة التداول | MINE_APPS | 📈 شاشات غرفة العمليات | ✅ خطوط الربط ومصر للمقاصة تعمل | كود مباشر 100% |
| #007 | لعبة نوب | MINE_APPS | 🏺 تجربة أول 5 مقابر (KV62) | ⏳ حفظ التقدم قيد الاختبار | فيجما 85% |
| #008 | هيباتيا | MINE_APPS | ⚡ نظام إعداد مذكرات الـ AI | ✅ تعمل لحظياً 24/7 | كود مباشر 100% |
| #009 | بوابة الدفع | MINE_APPS | 💳 SDK مدمج في فور بي ونوب سبورتس | ✅ متابعة العمليات نشطة | كود مباشر 100% |
| #010 | أكاديمي برو | MINE_APPS | ⏳ في انتظار أول APK تجريبي | ✅ لوحة التقييمات جاهزة | فيجما 75% |
`;

    await createOrUpdateTextFile("STATUS_MATRIX.md", masterFolderId, matrixContent);

    // Populate each project folder with its dedicated PROJECT_BRIEF.md
    // 1. 4B
    await createOrUpdateTextFile(
      "PROJECT_BRIEF.md",
      mashweerSubfolders[0].id,
      `# فور بي (4B Passenger & Fleet) - #001
- **التصنيف:** مشاوير
- **حالة الـ APK:** استلمنا الـ APK التجريبي للتشغيل والتجربة الميدانية
- **حالة الداش بورد:** استلمنا الداش بورد لاختبار العمليات وإدخال وتدقيق البيانات
- **نسبة فيجما:** 95%
- **الإيميلات المعتمدة:** admin@4b-app.com, support@4b-app.com, team@4b-app.com, operations@4b-app.com
- **الميتنج القادم:** السبت القادم - 5:00 مساءً (Google Meet)
- **روابط هامة:**
  - فيجما: https://www.figma.com/design/ulWwUzLnKThS2cfJWDetX6
  - الداش بورد: https://dashboard.mashawer.com.eg
  - Drive: ${mashweerSubfolders[0].link || 'مجلد فور بي على Google Drive'}
- **الطلبات المفتوحة:**
  1. مراجعة إشعارات الدفع والخصومات التلقائية
  2. فحص سرعة استجابة الخرائط وتتبع الكابتن المباشر
- **ملاحظات تشغيلية:** التطبيق والداش بورد يجري اختبارهما معاً لمطابقة تدفق البيانات من التطبيق إلى لوحة العمليات.`
    );

    // 2. Wekala
    await createOrUpdateTextFile(
      "PROJECT_BRIEF.md",
      mashweerSubfolders[1].id,
      `# وكالة (WeKaLa Fleet & Agency) - #002
- **التصنيف:** مشاوير
- **حالة الـ APK:** ✅ تم استلام أحدث نسخة APK رسمياً بعد التعديلات الأخيرة وجاري الفحص
- **حالة الداش بورد:** لم نستلم الداش بورد بعد (قيد التطوير من الفريق الخارجي)
- **نسبة فيجما:** 80%
- **الإيميلات المعتمدة:** contact@wekala.com, dev@wekala.com, partner@wekala.com
- **الميتنج القادم:** الأحد القادم - 6:30 مساءً
- **روابط هامة ومجلدات:**
  - مجلد العمل على Google Drive: ${mashweerSubfolders[1].link || 'متاح في المجلد الحالي'}
  - ملف التصميم فيجما: https://www.figma.com/design/oYxkmwZcGae674BRA5ZOen/Wikala
- **الطلبات المفتوحة والملاحظات:**
  1. تم استلام ملف الـ APK الأخير بعد التعديلات ووضعه للفحص التشغيلي
  2. متابعة استلام الداش بورد لإدارة مكاتب الوكلاء والعمولات
  3. فحص خرائط ومواقع فروع الوكلاء ومحطات التوزيع`
    );

    // 3. Daro
    await createOrUpdateTextFile(
      "PROJECT_BRIEF.md",
      mashweerSubfolders[2].id,
      `# دارو (Daro Cargo & Shipping) - #003
- **التصنيف:** مشاوير
- **حالة الـ APK:** في انتظار رفع نسخة الـ APK الخاصة بقارئ الباركود ومحطات الشحن
- **حالة الداش بورد:** لوحة توزيع محطات الشحن قيد التصميم الهندسي
- **نسبة فيجما:** 70%
- **الإيميلات المعتمدة:** cargo@mashawer.com.eg, operations@daro.com
- **الميتنج القادم:** الإثنين القادم - 4:30 عصراً
- **روابط هامة:**
  - فيجما: https://www.figma.com/design/aR1aanpRzGL7aMoxROGgt5/Daro
- **الطلبات المفتوحة:**
  1. فحص سرعة قراءة الباركود للطرود عند استلام الشحنة
  2. تجهيز بوليصة الشحن الرقمية وإرسال رسالة SMS للعميل`
    );

    res.json({
      success: true,
      masterFolder: {
        id: masterFolderId,
        name: "NOUB_IDLE",
        link: masterFolder.webViewLink || `https://drive.google.com/drive/folders/${masterFolderId}`,
      },
      mashweer: {
        id: mashweerFolder.id,
        link: mashweerFolder.webViewLink,
        subfolders: mashweerSubfolders,
      },
      mineApps: {
        id: mineAppsFolder.id,
        link: mineAppsFolder.webViewLink,
        subfolders: mineSubfolders,
      },
      message: "تم إنشاء وتنسيق مستودع NOUB_IDLE بالكامل على Google Drive بنجاح!",
    });
  } catch (error: any) {
    console.error("Error setting up NOUB_IDLE on Drive:", error);
    res.status(500).json({ error: error.message || "Failed to setup Drive folder structure" });
  }
});

// 2. Query or read files from NOUB_IDLE
app.get("/api/drive/noub-idle-status", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Missing authorization token" });
    }
    const token = authHeader.replace("Bearer ", "").trim();

    const searchRoot = await callDriveApi(
      "/files?q=" + encodeURIComponent("name = 'NOUB_IDLE' and mimeType = 'application/vnd.google-apps.folder' and trashed = false") + "&fields=files(id, name, webViewLink)",
      token
    );

    if (!searchRoot.files || searchRoot.files.length === 0) {
      return res.json({ exists: false });
    }

    const folder = searchRoot.files[0];

    // List files inside NOUB_IDLE
    const list = await callDriveApi(
      `/files?q=${encodeURIComponent(`'${folder.id}' in parents and trashed = false`)}&fields=files(id, name, mimeType, webViewLink, modifiedTime)`,
      token
    );

    res.json({
      exists: true,
      folder: {
        id: folder.id,
        name: folder.name,
        link: folder.webViewLink || `https://drive.google.com/drive/folders/${folder.id}`,
      },
      files: list.files || [],
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Serve Vite in dev or static in production
async function startServer() {
  if (process.env.NODE_ENV === "production") {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  } else {
    // In dev mode, mount Vite middleware to serve index.html, /src/main.tsx, and HMR
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Mashweer Musheer] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
