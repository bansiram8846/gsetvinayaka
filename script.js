/* Vinayaka Festival 2026 — final synchronized Supabase-powered script. */
/* =========================================================
   VINAYAKA FESTIVAL 2026
   Gowtham Sai Elite Towers

   Supabase-powered version

   IMPORTANT:
   Replace the two values below with:

   SUPABASE_URL
   SUPABASE_PUBLISHABLE_OR_ANON_KEY

   NEVER put service_role/secret key here.
   ========================================================= */


/* =========================================================
   SUPABASE CONFIGURATION
   ========================================================= */

/* =========================================================
   NETWORK RESILIENCE & SAFE FETCH HELPER
   ========================================================= */

async function safeFetch(resource, options) {
  try {
    return await fetch(resource, options);
  } catch (err) {
    console.warn("Handled network fetch warning for:", (resource && resource.url) || resource, err && err.message);
    return new Response(
      JSON.stringify({ error: "Network fetch unavailable", message: err && err.message }),
      {
        status: 503,
        statusText: "Service Unavailable",
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}

if (typeof window !== "undefined") {
  window.addEventListener("unhandledrejection", (event) => {
    const msg = event?.reason?.message || String(event?.reason);
    if (
      msg.includes("Failed to fetch") ||
      msg.includes("NetworkError") ||
      event?.reason?.name === "TypeError"
    ) {
      console.warn("Handled network fetch warning in script:", msg);
      event.preventDefault();
    }
  });
}

const SUPABASE_URL = "https://pezibfmuogaorcyyhqaj.supabase.co";

const SUPABASE_ANON_KEY =
  "sb_publishable_70bx8FZ74U7Cm1ykDNF-CQ_92f145Bz";

let supabaseClient = null;
try {
  if (typeof window !== "undefined" && window.supabase && typeof window.supabase.createClient === "function") {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: false,
        detectSessionInUrl: false
      },
      global: {
        fetch: safeFetch
      }
    });
  }
} catch (err) {
  console.warn("Supabase client init warning:", err);
  supabaseClient = null;
}


/* =========================================================
   FESTIVAL CONFIGURATION
   ========================================================= */

const festivalConfig = {

  title: "Vinayaka Festival 2026",

  societyName: "Gowtham Sai Elite Towers",

  association: "Residents Welfare Association",

  dates: "14th September – 19th September 2026",

  durationText: "6 Auspicious Days",

  mandapLocation: "Ground Floor",

  idolDonor: {
    name: "Praveen & Family",
    flat: "201"
  },

  annadanamHost: {
    name: "Mohan Rao & Family",
    flat: "102",
    date: "2026-09-19"
  }

};


/* =========================================================
   DEFAULT HERO SLIDES
   Used only when Supabase has no carousel records.
   ========================================================= */

const DEFAULT_HERO_SLIDES = [

  {
    image: "/images/eco_clay_ganesha.jpg",

    tag: "Sacred Idol • Flat 201",

    title: "Eco-Friendly 4ft Clay Ganesha Murti",

    ctaText: "Explore Puja Slots",

    ctaLink: "#puja-annadanam"
  },

  {
    image: "/images/maha_annadanam_feast.jpg",

    tag: "Saturday, 19 Sept • Flat 102",

    title: "Grand Maha Annadanam Community Feast",

    ctaText: "View Annadanam",

    ctaLink: "#puja-annadanam"
  },

  {
    image:
      "https://images.unsplash.com/photo-1604608672516-f1b9c0e1c7c0?auto=format&fit=crop&w=1400&q=85",

    tag: "Every Evening • 07:30 PM",

    title: "Community Maha Aarti & Gotra Archana",

    ctaText: "Book Sankalpam",

    ctaLink: "#puja-annadanam"
  }

];

/* =========================================================
   DEFAULT GALLERY ITEMS
   ========================================================= */

const DEFAULT_GALLERY = [
  {
    image: "/images/eco_clay_ganesha.jpg",
    tag: "మట్టి వినాయకుడు (Flat 201)",
    title: "పర్యావరణ హిత 4 అడుగుల మట్టి వినాయకుడు",
    alt: "ప్రవీణ్ గారిచే సమర్పించబడిన 4 అడుగుల మట్టి వినాయక విగ్రహం • పూజా వేదిక: గ్రౌండ్ ఫ్లోర్ (Ground Floor)"
  },
  {
    image: "/images/maha_annadanam_feast.jpg",
    tag: "మహా అన్నదానం (Flat 101)",
    title: "బృహత్ మహా అన్నదానం సమారాధన",
    alt: "మోహన్ రావు గారి కుటుంబం (Flat 101) సమర్పణలో సంప్రదాయ అరటి ఆకు భోజనం • వేదిక: గ్రౌండ్ ఫ్లోర్ (Ground Floor)"
  },
  {
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDH7ps91U7ZGZ3vO0BiDCoTpARrEvQRkRHsN5gs5dnmHMIJIr9V2xAv7pYbAsSOV0JoXdO6qudjJ84Mic6moZk_INo_hJumvz_TlWppbGfx1ZAfxOZoCQpaTUshbP5ePWcD5a9s324FMjeQs-L2L0wafw2uqNcOV2a1cSrGtQxIxMYbB5JME4FKyJg6sdAofOdpfxIaPjadve0QIQL9PsspxPzVJrWaod-ciflez312eeRTOnGj9Z2C",
    tag: "మండప అలంకరణ",
    title: "బంతిపూల తోరణాలు & దీపాలంకరణ",
    alt: "దివ్య బంతిపూల తోరణాలు మరియు వెలిగే ఇత్తడి దీపాలతో శోభిల్లే విఘ్నేశ్వర మండపం • వేదిక: గ్రౌండ్ ఫ్లోర్ (Ground Floor)"
  },
  {
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCllnUoaC6qrMkEK_moydxUlHbu-hdkkmC1nO1XoWFeECkypipJ7vdadlpoF155p915hIFAD0hU7ughXi8qy-VxWTAi2vBrVh3NFPQ343I9vygxPgkaNIkq0iXsRba1B5FCfZh1ExnnzXp0uHooPGmz4hN7ylQ7_E3hV6IX2s6cFQkAzF0lSyTibPC78K-sglbYsctQ8UeLXB9OYhmnDUcA8EQPt1gm9JjFDP1ya9XUmPHOWTGbfgNy",
    tag: "మహా హారతి",
    title: "సాయంత్రం భక్తిశ్రద్ధలతో మహా హారతి",
    alt: "నివాసితులందరూ పాల్గొన్న దివ్య సాయంకాల మహా హారతి • వేదిక: గ్రౌండ్ ఫ్లోర్ (Ground Floor)"
  },
  {
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCXaPj0XdhZSSOYNmeic47VXfwKfHOL4AAUhdYI1fNpK6PfCLUeFaQ5SA8Y03okuCNdt6nMPyoCk3MTSneLAaGDnI8O7mo2lbiLCBPzhjZqcIIQ1OkgmMdMZ60Am5qkWWWE5aVKtzZYsdL7_PnlA2fqhKwYRi4h-Zmc3tZo-5E324c4G3wcO482jUPcJ-WTOo_tnGlaBBmkXymabqlse_H36h-TRSRTIwhQoq8AHJXC7Eu7riVo7WTF",
    tag: "సాంస్కృతిక వేడుకలు",
    title: "పిల్లల రంగోలి & చిత్రలేఖన పోటీలు",
    alt: "సొసైటీ పిల్లల రంగురంగుల రంగోలి పోటీలు మరియు సాంస్కృతిక ప్రదర్శనలు • వేదిక: గ్రౌండ్ ఫ్లోర్ (Ground Floor)"
  },
  {
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBPXg1eyUq-5ZghaKs92wu8mze2jzIe_Lat7tPCa3FbM1RVwk7fp3T2EF5Rh7MbAP2-jmr0pk0SuKmsxavT_j3EwxzCM9hrZ53kMJalE38RauujZ7KlDuHdV_9VgXCJ030jNIN8-AxmNtyFeg0GpOJFh3a6uZ438ift9OLLrfaHmjD-nSG_pXrvz50LOHyl_wIt_0M2dERe46sMGturl7gt6P-Mg8_PU3hFH3nqbPZQ9IXfIQIpvpxj",
    tag: "నైవేద్యం & ప్రసాదం",
    title: "108 మోదకాల నైవేద్య సమర్పణ",
    alt: "స్వామివారికి సమర్పించిన ఘుమఘుమలాడే సంప్రదాయ మోదకాలు మరియు బెల్లం లడ్డూల ప్రసాదం"
  },
  {
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCuk0Kv_u8AituR5DWMzMvKsLRRS1PLZ1OYFxf9gp08WJXNIHU3IINBpl0muuQdz8ObQw7uIA0vrI_qILSBBzyUPJWzw8i78JsJHfSawtljWXsymI0t3lr8Dkz8LNSxLnH9q4B1fQg_I-A-TmGnCwTAphvUP7cJ403iGtlYUPAhg_PqIdUCnUgAEy3F6mpIuUZbUvH-F_U2famN09kLjUkVlWxE49-iQ_SU60kYtSzQJ5gW25OxMxUo",
    tag: "నిమజ్జనం",
    title: "శ్రీ గణేష్ నిమజ్జన శోభాయాత్ర & లడ్డూ వేలం",
    alt: "డప్పు వాయిద్యాలు, పుష్పవృష్టి మరియు భక్తి గీతాలతో గ్రౌండ్ ఫ్లోర్ నుండి ప్రారంభమైన నిమజ్జన యాత్ర"
  }
];


/* =========================================================
   FESTIVAL SCHEDULE
   ========================================================= */

const scheduleData = [

  {
    dayNumber: "Day 01",

    date: "14 Sept (Mon)",

    badgeText: "Prana Pratishtha",

    badgeType: "gold",

    theme: "theme-8d-amber",

    icon: "temple_hindu",

    title: "Ganpati Sthapana & Kalasa Puja",

    time: "10:00 AM – 12:30 PM • Aarti 07:30 PM",

    location: "Ground Floor",

    description:
      "Ceremonial 4ft eco-clay idol installation followed by Vedic chanting, Panchamrutha Abhishekam and evening Maha Aarti.",

    category: "puja special",

    isHighlight: false
  },

  {
    dayNumber: "Day 02",

    date: "15 Sept (Tue)",

    badgeText: "Daily Puja",

    badgeType: "saffron",

    theme: "theme-8d-saffron",

    icon: "local_fire_department",

    title: "Daily Puja & Evening Maha Aarti",

    time: "07:30 PM",

    location: "Ground Floor",

    description:
      "Daily family sankalpam, Ganapati Puja and community Maha Aarti.",

    category: "puja",

    isHighlight: false
  },

  {
    dayNumber: "Day 03",

    date: "16 Sept (Wed)",

    badgeText: "Daily Puja",

    badgeType: "saffron",

    theme: "theme-8d-purple",

    icon: "fireplace",

    title: "Ganapathi Homam & Evening Aarti",

    time: "07:30 PM",

    location: "Ground Floor",

    description:
      "Sacred Ganapathi Homam followed by family sankalpam and Maha Aarti.",

    category: "puja",

    isHighlight: false
  },

  {
    dayNumber: "Day 04",

    date: "17 Sept (Thu)",

    badgeText: "Daily Puja",

    badgeType: "saffron",

    theme: "theme-8d-blue",

    icon: "spa",

    title: "Gotra Archana & Evening Maha Aarti",

    time: "07:30 PM",

    location: "Ground Floor",

    description:
      "Family Gotra Archana and community Maha Aarti.",

    category: "puja",

    isHighlight: false
  },

  {
    dayNumber: "Day 05",

    date: "18 Sept (Fri)",

    badgeText: "Youth & Cultural",

    badgeType: "gold",

    theme: "theme-8d-teal",

    icon: "palette",

    title: "Children's Sloka, Rangoli & Cultural Evening",

    time: "05:00 PM – 07:30 PM",

    location: "Ground Floor",

    description:
      "Children's clay Ganesha art, Rangoli, Sloka and Bhajan Sandhya followed by Maha Aarti.",

    category: "cultural puja",

    isHighlight: false
  },

  {
    dayNumber: "Day 06",

    date: "19 Sept (Sat)",

    badgeText: "Grand Finale Puja",

    badgeType: "gold",

    theme: "theme-8d-rose",

    icon: "water_drop",

    title: "Final Maha Puja & Kalasa Udvasana",

    time: "10:00 AM – 12:30 PM",

    location: "Ground Floor",

    description:
      "Maha Purnahuti, Kalasa Udvasana and Rajopachara Puja.",

    category: "puja special",

    isHighlight: false
  },

  {
    dayNumber: "Day 06",

    date: "19 Sept (Sat)",

    badgeText: "Grand Community Feast",

    badgeType: "crimson",

    theme: "theme-8d-crimson",

    icon: "restaurant",

    title: "Grand Maha Annadanam",

    time: "12:30 PM – 03:30 PM",

    location: "Ground Floor",

    description:
      "Traditional Satvik community feast by Mohan Rao & Family, Flat 102, for residents, staff, security and devotees.",

    category: "special",

    isHighlight: true
  },

  {
    dayNumber: "Day 06",

    date: "19 Sept (Sat)",

    badgeText: "Grand Finale",

    badgeType: "crimson",

    theme: "theme-8d-indigo",

    icon: "celebration",

    title: "Visarjan Shobha Yatra",

    time: "04:00 PM Onwards",

    location: "Ground Floor & Procession Route",

    description:
      "Sacred procession and eco-friendly Ganesha immersion ceremony.",

    category: "special puja",

    isHighlight: false
  }

];


/* =========================================================
   PUJA DATES
   Exactly 3 families per day.
   ========================================================= */

const PUJA_DATES = [

  {
    date: "2026-09-14",
    label: "14 Sept (Mon)"
  },

  {
    date: "2026-09-15",
    label: "15 Sept (Tue)"
  },

  {
    date: "2026-09-16",
    label: "16 Sept (Wed)"
  },

  {
    date: "2026-09-17",
    label: "17 Sept (Thu)"
  },

  {
    date: "2026-09-18",
    label: "18 Sept (Fri)"
  },

  {
    date: "2026-09-19",
    label: "19 Sept (Sat)"
  }

];


/* =========================================================
   ANNADANAM DISPLAY ITEMS

   Exactly 3 sponsorship slots in the UI.
   Multiple donors can support each slot through
   annadanam_donors.
   ========================================================= */

const ANNADANAM_ITEMS = [

  "Grand Maha Annadanam Community Feast",

  "Food & Grocery Support",

  "Serving & Dining Support"

];


/* =========================================================
   STATE
   ========================================================= */

let heroSlides = [];

let currentSlideIndex = 0;

let slideshowTimer = null;

let galleryData = [];

let pujaBookings = [];

let annadanamDonors = [];

let currentLightboxItem = null;

let currentPujaRecord = null;

let currentAnnadanamSlot = null;

let isAdmin = false;

let currentUser = null;


/* =========================================================
   INIT
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  async () => {
    try { setupMobileNav(); } catch (e) { console.warn("setupMobileNav error:", e); }
    try { setupScrollSpy(); } catch (e) { console.warn("setupScrollSpy error:", e); }
    try { setupModalAccessibility(); } catch (e) { console.warn("setupModalAccessibility error:", e); }
    try { renderSchedule(); } catch (e) { console.warn("renderSchedule error:", e); }
    try { setupPujaDateSelect(); } catch (e) { console.warn("setupPujaDateSelect error:", e); }

    try { await checkAdminSession(); } catch (e) { console.warn("checkAdminSession error:", e); }
    try { await loadCarousel(); } catch (e) { console.warn("loadCarousel error:", e); }
    try { await loadGallery(); } catch (e) { console.warn("loadGallery error:", e); }
    try { await loadPujaBookings(); } catch (e) { console.warn("loadPujaBookings error:", e); }
    try { await loadAnnadanamDonors(); } catch (e) { console.warn("loadAnnadanamDonors error:", e); }
  }
);


/* =========================================================
   SECURITY / ADMIN
   ========================================================= */

async function checkAdminSession() {
  try {
    if (!supabaseClient || !supabaseClient.auth) {
      setAdminState(false);
      return;
    }

    const sessionRes = await supabaseClient.auth.getSession().catch((e) => {
      console.warn("getSession notice:", e);
      return { data: { session: null } };
    });

    const session = sessionRes && sessionRes.data && sessionRes.data.session;
    if (!session) {
      setAdminState(false);
      return;
    }

    currentUser = session.user;

    const {
      data,
      error
    } = await supabaseClient.rpc("is_admin").catch((e) => {
      console.warn("is_admin rpc notice:", e);
      return { data: null, error: e };
    });

    if (error) {
      console.warn("is_admin verification warning:", error);
      setAdminState(false);
      return;
    }

    setAdminState(Boolean(data));
  }
  catch (error) {
    console.warn(
      "Admin session check handled notice:",
      error
    );
    setAdminState(false);
  }
}


function setAdminState(value) {

  isAdmin = value === true;

  document.body.classList.toggle("admin-mode", isAdmin);

  const toolbar =
    document.getElementById(
      "adminToolbar"
    );

  const loginBtn =
    document.getElementById(
      "adminLoginBtn"
    );

  const logoutBtn =
    document.getElementById(
      "adminLogoutBtn"
    );

  const mobileBtn =
    document.getElementById(
      "mobileAdminBtn"
    );

  if (toolbar) {

    toolbar.style.display =
      isAdmin ? "flex" : "none";

  }

  if (loginBtn) {

    loginBtn.style.display =
      isAdmin ? "none" : "inline-flex";

  }

  if (logoutBtn) {

    logoutBtn.style.display =
      isAdmin ? "inline-flex" : "none";

  }

  if (mobileBtn) {

    mobileBtn.textContent =
      isAdmin
        ? "Admin Logout"
        : "Admin Login";

    mobileBtn.onclick =
      isAdmin
        ? adminLogout
        : openAdminLoginModal;

  }

  renderGallery();

  renderPujaTable();

  renderAnnadanamTable();

}


/* =========================================================
   ADMIN LOGIN
   ========================================================= */

window.openAdminLoginModal = function () {

  if (isAdmin) {

    adminLogout();

    return;

  }

  document
    .getElementById("adminLoginModal")
    ?.classList.add("open");

  document.body.classList.add("modal-open");

};


window.closeAdminLoginModal = function () {

  closeModal(
    document.getElementById(
      "adminLoginModal"
    )
  );

};


window.adminLogin = async function (event) {

  event.preventDefault();

  const email =
    document
      .getElementById("adminEmail")
      .value
      .trim();

  const password =
    document
      .getElementById("adminPassword")
      .value;

  if (!email || !password) {

    showToast(
      "Please enter your email and password.",
      "info"
    );

    return;

  }

  try {

    showToast(
      "Signing in...",
      "info"
    );

    const {
      data,
      error
    } =
      await supabaseClient.auth.signInWithPassword({
        email,
        password
      });

    if (error) {

      throw error;

    }

    currentUser = data.user;

    const {
      data: adminResult,
      error: adminError
    } =
      await supabaseClient.rpc(
        "is_admin"
      );

    if (adminError) {

      await supabaseClient.auth.signOut();

      throw adminError;

    }

    if (!adminResult) {

      await supabaseClient.auth.signOut();

      setAdminState(false);

      throw new Error(
        "This account is not registered as a festival administrator."
      );

    }

    setAdminState(true);

    closeAdminLoginModal();

    showToast(
      "Admin login successful."
    );

  }
  catch (error) {

    console.warn("adminLogin notice:", error);

    showToast(
      error.message ||
      "Unable to sign in.",
      "error"
    );

  }

};


window.adminLogout = async function () {

  await supabaseClient.auth.signOut();

  currentUser = null;

  setAdminState(false);

  showToast(
    "Admin logged out.",
    "info"
  );

};


/* =========================================================
   SUPABASE STORAGE HELPERS
   ========================================================= */

const STORAGE_BUCKET =
  "festival-images";


function sanitizeFileName(
  fileName
) {

  return fileName

    .toLowerCase()

    .replace(/[^a-z0-9._-]/g, "-")

    .replace(/-+/g, "-");

}


function createStoragePath(
  folder,
  file
) {

  const unique =
    `${Date.now()}-${crypto.randomUUID()}`;

  return `${folder}/${unique}-${sanitizeFileName(file.name)}`;

}


function getPublicStorageUrl(storagePath) {
  if (!storagePath) return "";
  if (storagePath.startsWith("http://") || storagePath.startsWith("https://") || storagePath.startsWith("/")) {
    return storagePath;
  }
  try {
    if (supabaseClient && supabaseClient.storage) {
      const { data } = supabaseClient
        .storage
        .from(STORAGE_BUCKET)
        .getPublicUrl(storagePath);
      if (data && data.publicUrl) return data.publicUrl;
    }
  } catch (e) {
    // fall through to construct URL
  }
  return `${SUPABASE_URL}/storage/v1/object/public/${STORAGE_BUCKET}/${storagePath}`;
}


async function uploadImage(
  file,
  folder
) {

  if (!file) {

    throw new Error(
      "Please select a photo or video."
    );

  }

  const isVideo =
    file.type.startsWith("video/") ||
    /\.(mp4|webm|ogg|mov|m4v)$/i.test(file.name);

  const isImage =
    file.type.startsWith("image/") ||
    /\.(jpg|jpeg|png|webp|gif)$/i.test(file.name);

  if (!isImage && !isVideo) {

    throw new Error(
      "Only image and video files are allowed."
    );

  }

  const MAX_SIZE =
    isVideo
      ? 50 * 1024 * 1024
      : 10 * 1024 * 1024;

  if (file.size > MAX_SIZE) {

    throw new Error(
      `File is larger than ${isVideo ? "50 MB" : "10 MB"}. Please choose a smaller file.`
    );

  }

  const storagePath =
    createStoragePath(
      folder,
      file
    );

  const {
    error
  } =
    await supabaseClient
      .storage
      .from(STORAGE_BUCKET)
      .upload(
        storagePath,
        file,
        {
          cacheControl: "3600",
          upsert: false,
          contentType: file.type || (isVideo ? "video/mp4" : "image/jpeg")
        }
      );

  if (error) {

    throw error;

  }

  return {
    storagePath,
    publicUrl:
      getPublicStorageUrl(
        storagePath
      ),
    isVideo
  };

}


/* =========================================================
   CAROUSEL
   ========================================================= */

async function loadCarousel() {
  try {
    if (supabaseClient) {
      const {
        data,
        error
      } =
        await supabaseClient
          .from("carousel_slides")
          .select("*")
          .order("sort_order", { ascending: true })
          .order("created_at", { ascending: true });

      if (!error && data && data.length) {
        heroSlides = data.map(row => ({
          id: row.id,
          image: row.image_url,
          storagePath: row.storage_path,
          tag: row.tag || "",
          title: row.title,
          ctaText: row.cta_text || "Explore",
          ctaLink: row.cta_link || "#schedule"
        }));
        initSlideshow();
        return;
      }
    }
  } catch (error) {
    console.warn("Supabase carousel fetch warning:", error);
  }

  // Fallback to local server API or default slides
  try {
    const res = await safeFetch("/api/carousel");
    if (res && res.ok) {
      const items = await res.json();
      if (Array.isArray(items) && items.length) {
        heroSlides = items;
        initSlideshow();
        return;
      }
    }
  } catch (e) {
    console.warn("Local carousel fallback warning:", e);
  }

  heroSlides = clone(DEFAULT_HERO_SLIDES);
  initSlideshow();
}


function initSlideshow() {

  const track =
    document.getElementById(
      "slideshowTrack"
    );

  const dots =
    document.getElementById(
      "slideshowDots"
    );

  if (!track || !dots) {

    return;

  }

  clearInterval(
    slideshowTimer
  );

  track.innerHTML = "";

  dots.innerHTML = "";

  if (!heroSlides.length) {

    track.innerHTML = `

      <div class="slide active">

        <div
          style="
            height:100%;
            display:grid;
            place-items:center;
            color:#fff;
            padding:30px;
            text-align:center;
          ">

          No festival slides available.

        </div>

      </div>

    `;

    return;

  }

  currentSlideIndex =
    Math.min(
      currentSlideIndex,
      heroSlides.length - 1
    );

  heroSlides.forEach(
    (slide, index) => {

      const slideDiv =
        document.createElement(
          "div"
        );

      slideDiv.className =
        `slide ${
          index === currentSlideIndex
            ? "active"
            : ""
        }`;

      slideDiv.innerHTML = `
        <img
          src="${escapeHtml(slide.image)}"
          alt="${escapeHtml(slide.title || "Festival highlight")}"
          loading="${index === 0 ? "eager" : "lazy"}">
      `;

      track.appendChild(
        slideDiv
      );


      const dot =
        document.createElement(
          "button"
        );

      dot.className =
        `dot ${
          index === currentSlideIndex
            ? "active"
            : ""
        }`;

      dot.type = "button";

      dot.setAttribute(
        "aria-label",
        `Go to slide ${index + 1}`
      );

      dot.addEventListener(
        "click",
        () => {

          goToSlide(index);

        }
      );

      dots.appendChild(dot);

    }
  );


  const prev =
    document.getElementById(
      "slideshowPrev"
    );

  const next =
    document.getElementById(
      "slideshowNext"
    );


  if (prev) {

    prev.onclick = () => {

      prevSlide();

      restartSlideshowTimer();

    };

  }


  if (next) {

    next.onclick = () => {

      nextSlide();

      restartSlideshowTimer();

    };

  }

  // Modern touch swipe support for mobile
  let touchStartX = 0;
  let touchStartY = 0;
  track.addEventListener("touchstart", (e) => {
    if (!e.changedTouches || !e.changedTouches.length) return;
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });

  track.addEventListener("touchend", (e) => {
    if (!e.changedTouches || !e.changedTouches.length) return;
    const diffX = e.changedTouches[0].screenX - touchStartX;
    const diffY = e.changedTouches[0].screenY - touchStartY;
    if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      restartSlideshowTimer();
    }
  }, { passive: true });


  startSlideshowTimer();

}


function showSlide(index, direction) {

  const slides =
    document.querySelectorAll(
      ".slide"
    );

  const dots =
    document.querySelectorAll(
      ".dot"
    );

  if (!slides.length) {

    return;

  }

  const previousIndex = currentSlideIndex;
  currentSlideIndex =
    (index + slides.length) %
    slides.length;

  if (previousIndex === currentSlideIndex && slides[currentSlideIndex]?.classList.contains("active")) {
    return;
  }

  const isNext = direction
    ? direction === "next"
    : (currentSlideIndex > previousIndex || (previousIndex === slides.length - 1 && currentSlideIndex === 0));

  slides.forEach(
    (slide, i) => {

      slide.classList.remove("slide-out-prev", "slide-out-next");

      if (i === previousIndex && i !== currentSlideIndex) {
        slide.classList.remove("active");
        slide.classList.add(isNext ? "slide-out-prev" : "slide-out-next");
      } else if (i === currentSlideIndex) {
        slide.classList.add("active");
      } else {
        slide.classList.remove("active");
      }

    }
  );

  dots.forEach(
    (dot, i) => {

      dot.classList.toggle(
        "active",
        i === currentSlideIndex
      );

    }
  );

}


function nextSlide() {

  showSlide(
    currentSlideIndex + 1,
    "next"
  );

}


function prevSlide() {

  showSlide(
    currentSlideIndex - 1,
    "prev"
  );

}


function goToSlide(index) {

  const dir = index > currentSlideIndex ? "next" : "prev";
  showSlide(index, dir);

  restartSlideshowTimer();

}


function startSlideshowTimer() {

  clearInterval(
    slideshowTimer
  );

  if (heroSlides.length > 1) {

    slideshowTimer =
      setInterval(
        nextSlide,
        5000
      );

  }

}


function restartSlideshowTimer() {

  startSlideshowTimer();

}


/* =========================================================
   CAROUSEL ADMIN
   ========================================================= */

window.openCarouselModal =
  function () {

    if (!isAdmin) {

      openAdminLoginModal();

      return;

    }

    document
      .getElementById(
        "carouselSlideForm"
      )
      ?.reset();

    switchCarouselTab(
      "add"
    );

    renderCarouselSlidesList();

    openModal(
      document.getElementById(
        "carouselModal"
      )
    );

  };


window.closeCarouselModal =
  function () {

    closeModal(
      document.getElementById(
        "carouselModal"
      )
    );

  };


window.switchCarouselTab =
  function (tab) {

    const addButton =
      document.getElementById(
        "tabBtnAddSlide"
      );

    const listButton =
      document.getElementById(
        "tabBtnListSlides"
      );

    const addContent =
      document.getElementById(
        "tabAddSlideContent"
      );

    const listContent =
      document.getElementById(
        "tabListSlidesContent"
      );

    const adding =
      tab === "add";

    addButton?.classList.toggle(
      "active",
      adding
    );

    listButton?.classList.toggle(
      "active",
      !adding
    );

    if (addContent) {

      addContent.style.display =
        adding
          ? "block"
          : "none";

    }

    if (listContent) {

      listContent.style.display =
        adding
          ? "none"
          : "block";

    }

    if (!adding) {

      renderCarouselSlidesList();

    }

  };


window.handleCarouselSlideUpload =
  async function (event) {

    event.preventDefault();

    if (!isAdmin || !currentUser) {

      showToast(
        "Admin login is required to upload carousel images.",
        "error"
      );

      return;

    }

    const file =
      document
        .getElementById(
          "carouselFileInput"
        )
        .files[0];

    if (!file) {
      showToast(
        "Please select a carousel image.",
        "info"
      );
      return;
    }


    try {

      showToast(
        "Uploading carousel image...",
        "info"
      );


      const uploaded =
        await uploadImage(
          file,
          "carousel"
        );


      const {
        data: existing
      } =
        await supabaseClient
          .from(
            "carousel_slides"
          )
          .select("sort_order")
          .order(
            "sort_order",
            {
              ascending: false
            }
          )
          .limit(1);


      const nextOrder =
        existing &&
        existing.length
          ? Number(
              existing[0].sort_order
            ) + 1
          : 1;


      const {
        error
      } =
        await supabaseClient
          .from(
            "carousel_slides"
          )
          .insert({

            image_url:
              uploaded.publicUrl,

            storage_path:
              uploaded.storagePath,

            title:
              file.name || "Festival highlight",

            tag: null,

            cta_text: null,

            cta_link: null,

            sort_order:
              nextOrder,

            uploaded_by:
              currentUser.id

          });


      if (error) {

        await deleteStorageFile(
          uploaded.storagePath
        );

        throw error;

      }


      await loadCarousel();

      document
        .getElementById(
          "carouselSlideForm"
        )
        ?.reset();

      showToast(
        "Carousel image uploaded successfully."
      );

    }
    catch (error) {

      console.warn("carousel upload notice:", error);

      showToast(
        error.message ||
        "Carousel upload failed.",
        "error"
      );

    }

  };


async function renderCarouselSlidesList() {

  const container =
    document.getElementById(
      "carouselSlidesList"
    );

  const count =
    document.getElementById(
      "carouselSlideCount"
    );

  if (!container) {

    return;

  }

  if (!isAdmin) {

    container.innerHTML = "";

    return;

  }


  const {
    data,
    error
  } =
    await supabaseClient

      .from(
        "carousel_slides"
      )

      .select("*")

      .order(
        "sort_order",
        {
          ascending: true
        }
      );


  if (error) {

    container.innerHTML = `

      <p>
        Unable to load carousel slides.
      </p>

    `;

    return;

  }


  if (count) {

    count.textContent =
      data?.length || 0;

  }


  if (!data?.length) {

    container.innerHTML = `

      <p
        style="
          text-align:center;
          color:var(--muted);
          padding:25px;
        ">

        No uploaded hero slides yet.

      </p>

    `;

    return;

  }


  container.innerHTML =
    data.map(
      slide => `

        <div class="carousel-slide-item">

          <img
            class="carousel-slide-thumb"
            src="${escapeHtml(
              slide.image_url
            )}"
            alt="">

          <div>

            <div class="carousel-slide-title">

              ${escapeHtml(
                slide.title
              )}

            </div>

            <div class="carousel-slide-tag">

              ${escapeHtml(
                slide.tag ||
                "Festival slide"
              )}

            </div>

          </div>

          <button
            type="button"
            class="btn-remove-slide"
            onclick="removeCarouselSlide('${slide.id}')">

            <span
              class="material-symbols-outlined"
              style="font-size:15px">

              delete

            </span>

            Remove

          </button>

        </div>

      `
    ).join("");

}


window.removeCarouselSlide =
  async function (id) {

    if (!isAdmin) {

      return;

    }

    const slide =
      heroSlides.find(
        item =>
          item.id === id
      );

    if (!slide) {

      return;

    }

    if (
      !confirm(
        `Remove "${slide.title}" from the hero carousel?`
      )
    ) {

      return;

    }


    try {

      const {
        error
      } =
        await supabaseClient

          .from(
            "carousel_slides"
          )

          .delete()

          .eq(
            "id",
            id
          );


      if (error) {

        throw error;

      }


      if (slide.storagePath) {

        await deleteStorageFile(
          slide.storagePath
        );

      }


      await loadCarousel();

      await renderCarouselSlidesList();

      showToast(
        "Hero slide removed.",
        "info"
      );

    }
    catch (error) {

      console.warn("delete carousel slide notice:", error);

      showToast(
        error.message ||
        "Unable to remove slide.",
        "error"
      );

    }

  };


/* =========================================================
   GALLERY
   ========================================================= */

function isVideoItem(item) {
  if (!item) return false;
  if (item.isVideo || item.type === "video" || item.tag === "Video") return true;
  const target = (item.file_name || item.storagePath || item.image || "").toLowerCase();
  return /\.(mp4|webm|ogg|mov|m4v)(\?.*)?$/i.test(target);
}

async function loadGallery() {
  try {
    if (supabaseClient) {
      const {
        data,
        error
      } =
        await supabaseClient
          .from("gallery")
          .select("*")
          .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        galleryData = data.map(row => {
          const isVid =
            (row.file_name && /\.(mp4|webm|ogg|mov|m4v)$/i.test(row.file_name)) ||
            (row.storage_path && /\.(mp4|webm|ogg|mov|m4v)$/i.test(row.storage_path)) ||
            row.category === "Video";

          return {
            id: row.id,
            image:
              row.storage_path
                ? getPublicStorageUrl(row.storage_path)
                : row.image_url || "",
            storagePath: row.storage_path,
            title:
              row.caption ||
              row.file_name ||
              (isVid ? "Festival Video" : "Festival Photo"),
            tag:
              row.category ||
              (isVid ? "Video" : "Festival"),
            alt:
              row.caption ||
              row.file_name ||
              (isVid ? "Festival Video" : "Festival Photo"),
            isVideo: isVid
          };
        });

        renderGallery();
        return;
      }
    }
  } catch (error) {
    console.warn("Supabase gallery load warning:", error);
  }

  // Fallback to local server API
  try {
    const res = await safeFetch("/api/gallery");
    if (res && res.ok) {
      const serverItems = await res.json();
      if (Array.isArray(serverItems) && serverItems.length > 0) {
        galleryData = serverItems;
        renderGallery();
        return;
      }
    }
  } catch (e) {
    console.warn("Local gallery fallback warning:", e);
  }

  // Fallback to DEFAULT_GALLERY
  galleryData = clone(DEFAULT_GALLERY);
  renderGallery();
}


function renderGallery() {

  const grid =
    document.getElementById(
      "galleryGrid"
    );

  if (!grid) {

    return;

  }


  if (!galleryData.length) {

    grid.innerHTML = `

      <div
        style="
          grid-column:1/-1;
          text-align:center;
          padding:45px 20px;
          border:1px dashed rgba(255,255,255,.25);
          border-radius:18px;
          color:#cdbdb5;
        ">

        <span
          class="material-symbols-outlined"
          style="font-size:44px">

          photo_library

        </span>

        <h3
          style="
            font-family:var(--font-display);
          ">

          No media yet

        </h3>

        <p>
          Festival photos and videos will appear here.
        </p>

      </div>

    `;

    return;

  }


  grid.innerHTML =
    galleryData.map(
      (item, index) => {
        const isVid = isVideoItem(item);

        return `
          <article
            class="gallery-card ${isVid ? "gallery-card-video" : ""}"
            role="button"
            tabindex="0"
            aria-label="View ${escapeHtml(item.title)}"
            onclick="openLightbox(${index})"
            onkeydown="galleryKeydown(event,${index})">

            ${
              isAdmin
                ? `
                  <div class="gallery-card-actions">
                    <button
                      type="button"
                      class="btn-gallery-delete"
                      onclick="deleteGalleryPhoto(event,${index})"
                      aria-label="Remove item">
                      <span class="material-symbols-outlined">
                        delete
                      </span>
                    </button>
                  </div>
                `
                : ""
            }

            ${
              isVid
                ? `
                  <video
                    src="${escapeHtml(item.image)}#t=0.5"
                    preload="metadata"
                    muted
                    playsinline>
                  </video>
                  <div class="gallery-video-badge" aria-hidden="true">
                    <span class="material-symbols-outlined">play_circle</span>
                  </div>
                `
                : `
                  <img
                    src="${escapeHtml(item.image)}"
                    alt="${escapeHtml(item.alt)}"
                    loading="lazy">
                `
            }

            <div class="gallery-overlay">

              <span class="gallery-tag">
                ${escapeHtml(item.tag)}
              </span>

              <h4 class="gallery-title">
                ${escapeHtml(item.title)}
              </h4>

            </div>

          </article>
        `;
      }
    ).join("");

}


window.openPhotoUploadModal =
  function () {

    if (!isAdmin) {

      openAdminLoginModal();

      return;

    }

    document
      .getElementById(
        "photoUploadModal"
      )
      ?.classList.add("open");

    document.body.classList.add(
      "modal-open"
    );

  };


window.closePhotoUploadModal =
  function () {

    closeModal(
      document.getElementById(
        "photoUploadModal"
      )
    );

  };


window.handlePhotoUpload =
  async function (event) {

    event.preventDefault();

    if (!isAdmin || !currentUser) {

      showToast(
        "Admin login is required.",
        "error"
      );

      return;

    }


    const file =
      document
        .getElementById(
          "photoFileInput"
        )
        .files[0];

    const title =
      document
        .getElementById(
          "photoTitleInput"
        )
        .value
        .trim();

    const tag =
      document
        .getElementById(
          "photoTagSelect"
        )
        .value;


    if (!file || !title) {

      showToast(
        "Please select a photo or video and enter a title.",
        "info"
      );

      return;

    }

    const isVideo =
      file.type.startsWith("video/") ||
      /\.(mp4|webm|ogg|mov|m4v)$/i.test(file.name);


    try {

      showToast(
        isVideo ? "Uploading video..." : "Uploading photo...",
        "info"
      );


      const uploaded =
        await uploadImage(
          file,
          "gallery"
        );


      const {
        error
      } =
        await supabaseClient

          .from("gallery")

          .insert({

            file_name:
              file.name,

            storage_path:
              uploaded.storagePath,

            caption:
              title,

            category:
              tag || (isVideo ? "Video" : "Festival"),

            uploaded_by:
              currentUser.id

          });


      if (error) {

        await deleteStorageFile(
          uploaded.storagePath
        );

        throw error;

      }


      await loadGallery();

      closePhotoUploadModal();

      document
        .getElementById(
          "photoFileInput"
        )
        .value = "";

      document
        .getElementById(
          "photoTitleInput"
        )
        .value = "";

      showToast(
        isVideo
          ? "Festival video uploaded successfully."
          : "Festival photo uploaded successfully."
      );

    }
    catch (error) {

      console.warn("gallery upload notice:", error);

      showToast(
        error.message ||
        (isVideo ? "Video upload failed." : "Photo upload failed."),
        "error"
      );

    }

  };


window.deleteGalleryPhoto =
  async function (event, index) {

    event?.stopPropagation();

    event?.preventDefault();

    if (!isAdmin) {

      showToast(
        "Admin login is required.",
        "error"
      );

      return;

    }


    const item =
      galleryData[index];

    if (!item) {

      return;

    }


    if (
      !confirm(
        `Remove "${item.title}" from the gallery?`
      )
    ) {

      return;

    }


    try {

      if (item.id) {

        const {
          error
        } =
          await supabaseClient

            .from("gallery")

            .delete()

            .eq(
              "id",
              item.id
            );


        if (error) {

          throw error;

        }

      }


      if (item.storagePath) {

        await deleteStorageFile(
          item.storagePath
        );

      }


      await loadGallery();

      closeLightbox();

      showToast(
        "Photo removed.",
        "info"
      );

    }
    catch (error) {

      console.warn("delete gallery item notice:", error);

      showToast(
        error.message ||
        "Unable to remove photo.",
        "error"
      );

    }

  };


async function deleteStorageFile(
  storagePath
) {

  if (!storagePath) {

    return;

  }

  const {
    error
  } =
    await supabaseClient

      .storage

      .from(
        STORAGE_BUCKET
      )

      .remove([
        storagePath
      ]);

  if (error) {

    console.warn(
      "Storage deletion warning:",
      error
    );

  }

}


/* =========================================================
   LIGHTBOX & MEDIA VIEWER
   ========================================================= */

let currentLightboxIndex = 0;
let lightboxScrollInitialized = false;

function updateLightboxView() {

  if (!galleryData.length || currentLightboxIndex < 0 || currentLightboxIndex >= galleryData.length) {

    return;

  }

  const item =
    galleryData[currentLightboxIndex];

  currentLightboxItem =
    item;

  const image =
    document.getElementById(
      "modalImg"
    );

  const video =
    document.getElementById(
      "modalVideo"
    );

  const title =
    document.getElementById(
      "modalTitle"
    );

  const counter =
    document.getElementById(
      "modalCounter"
    );

  const deleteButton =
    document.getElementById(
      "deleteLightboxBtn"
    );

  const prevBtn =
    document.getElementById(
      "lightboxPrevBtn"
    );

  const nextBtn =
    document.getElementById(
      "lightboxNextBtn"
    );

  const isVid =
    isVideoItem(item);

  if (isVid) {

    if (image) {

      image.style.display = "none";

      image.src = "";

    }

    if (video) {

      video.style.display = "block";

      video.src = item.image;

      video.load();

      video.play().catch(() => {});

    }

  } else {

    if (video) {

      video.pause();

      video.style.display = "none";

      video.src = "";

    }

    if (image) {

      image.style.display = "block";

      image.src = item.image;

      image.alt = item.alt || item.title || "Festival photo";

    }

  }

  if (title) {

    title.textContent = item.title;

  }

  if (counter) {

    counter.textContent = `${currentLightboxIndex + 1} / ${galleryData.length}`;

  }

  if (deleteButton) {

    deleteButton.style.display =
      isAdmin
        ? "inline-flex"
        : "none";

  }

  if (prevBtn) {

    prevBtn.style.display =
      galleryData.length > 1
        ? "inline-flex"
        : "none";

  }

  if (nextBtn) {

    nextBtn.style.display =
      galleryData.length > 1
        ? "inline-flex"
        : "none";

  }

  renderLightboxThumbnails();

}


function renderLightboxThumbnails() {

  const strip =
    document.getElementById(
      "lightboxThumbStrip"
    );

  if (!strip) return;

  if (galleryData.length <= 1) {

    strip.innerHTML = "";

    strip.style.display = "none";

    return;

  }

  strip.style.display = "flex";

  strip.innerHTML =
    galleryData.map(
      (item, idx) => {

        const isCurrent = idx === currentLightboxIndex;
        const isVid = isVideoItem(item);

        return `
          <button
            type="button"
            class="lightbox-thumb ${isCurrent ? "active" : ""}"
            onclick="openLightbox(${idx})"
            aria-label="View media ${idx + 1}">
            ${
              isVid
                ? `
                  <video src="${escapeHtml(item.image)}#t=0.5" muted playsinline preload="metadata"></video>
                  <span class="thumb-vid-icon"><span class="material-symbols-outlined">play_arrow</span></span>
                `
                : `
                  <img src="${escapeHtml(item.image)}" alt="" loading="lazy">
                `
            }
          </button>
        `;

      }
    ).join("");

  const activeThumb =
    strip.querySelector(".lightbox-thumb.active");

  if (activeThumb) {

    activeThumb.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest"
    });

  }

}


function setupLightboxScroll() {

  if (lightboxScrollInitialized) return;

  lightboxScrollInitialized = true;

  const modal =
    document.getElementById(
      "galleryModal"
    );

  if (!modal) return;

  // Mouse wheel scroll to navigate between photos
  let wheelThrottle = false;

  modal.addEventListener(
    "wheel",
    (e) => {

      if (!modal.classList.contains("open")) return;

      if (e.target && e.target.closest && e.target.closest(".lightbox-thumb-strip")) {

        return;

      }

      e.preventDefault();

      if (wheelThrottle) return;

      wheelThrottle = true;

      setTimeout(() => { wheelThrottle = false; }, 260);

      if (e.deltaY > 15 || e.deltaX > 15) {

        nextLightboxItem();

      } else if (e.deltaY < -15 || e.deltaX < -15) {

        prevLightboxItem();

      }

    },
    { passive: false }
  );

  // Touch swipe to navigate between photos
  let touchStartX = 0;
  let touchStartY = 0;

  modal.addEventListener(
    "touchstart",
    (e) => {

      if (!modal.classList.contains("open")) return;

      if (!e.changedTouches || !e.changedTouches.length) return;

      touchStartX = e.changedTouches[0].screenX;

      touchStartY = e.changedTouches[0].screenY;

    },
    { passive: true }
  );

  modal.addEventListener(
    "touchend",
    (e) => {

      if (!modal.classList.contains("open")) return;

      if (!e.changedTouches || !e.changedTouches.length) return;

      if (e.target && e.target.closest && e.target.closest(".lightbox-thumb-strip")) return;

      const diffX = e.changedTouches[0].screenX - touchStartX;

      const diffY = e.changedTouches[0].screenY - touchStartY;

      if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {

        if (diffX < 0) {

          nextLightboxItem();

        } else {

          prevLightboxItem();

        }

      }

    },
    { passive: true }
  );

  // Arrow key navigation
  window.addEventListener("keydown", (e) => {

    if (!modal.classList.contains("open")) return;

    if (e.key === "ArrowRight" || e.key === "ArrowDown") {

      e.preventDefault();

      nextLightboxItem();

    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {

      e.preventDefault();

      prevLightboxItem();

    } else if (e.key === "Escape") {

      closeLightbox();

    }

  });

}


window.nextLightboxItem =
  function (event) {

    if (event) {

      event.stopPropagation();

    }

    if (!galleryData.length) return;

    currentLightboxIndex =
      (currentLightboxIndex + 1) % galleryData.length;

    updateLightboxView();

  };


window.prevLightboxItem =
  function (event) {

    if (event) {

      event.stopPropagation();

    }

    if (!galleryData.length) return;

    currentLightboxIndex =
      (currentLightboxIndex - 1 + galleryData.length) % galleryData.length;

    updateLightboxView();

  };


window.galleryKeydown =
  function (
    event,
    index
  ) {

    if (
      event.key === "Enter" ||
      event.key === " "
    ) {

      event.preventDefault();

      openLightbox(index);

    }

  };


window.openLightbox =
  function (index) {

    if (!galleryData.length) return;

    if (index < 0 || index >= galleryData.length) return;

    currentLightboxIndex = index;

    updateLightboxView();

    const modal =
      document.getElementById(
        "galleryModal"
      );

    openModal(modal);

    setupLightboxScroll();

  };


window.closeLightbox =
  function () {

    const video =
      document.getElementById(
        "modalVideo"
      );

    if (video) {

      video.pause();

      video.src = "";

    }

    closeModal(
      document.getElementById(
        "galleryModal"
      )
    );

    currentLightboxItem =
      null;

  };


window.deleteCurrentLightboxPhoto =
  async function () {

    if (!currentLightboxItem) {

      return;

    }

    const index = currentLightboxIndex;

    if (index >= 0 && index < galleryData.length) {

      await deleteGalleryPhoto(
        null,
        index
      );

    }

  };


/* =========================================================
   PUJA SEVA
   ========================================================= */

function setupPujaDateSelect() {

  const select =
    document.getElementById(
      "slotDateInput"
    );

  if (!select) {

    return;

  }


  select.innerHTML =
    PUJA_DATES.map(
      day => `

        <option
          value="${day.date}">

          ${day.label}

        </option>

      `
    ).join("");

}


async function loadPujaBookings() {
  try {
    if (supabaseClient) {
      const {
        data,
        error
      } =
        await supabaseClient
          .from("puja_seva")
          .select("*")
          .order("seva_date", { ascending: true })
          .order("slot_number", { ascending: true });

      if (!error && Array.isArray(data)) {
        pujaBookings = data;
        renderPujaTable();
        return;
      }
    }
  } catch (error) {
    console.warn("Supabase puja load warning:", error);
  }

  // Fallback to local server API
  try {
    const res = await safeFetch("/api/slots");
    if (res && res.ok) {
      const slotsData = await res.json();
      if (Array.isArray(slotsData)) {
        pujaBookings = slotsData;
        renderPujaTable();
        return;
      }
    }
  } catch (e) {
    console.warn("Local slots fallback warning:", e);
  }

  pujaBookings = [];
  renderPujaTable();
}


function renderPujaTable() {

  const tbody =
    document.getElementById(
      "yajamanTableBody"
    );

  if (!tbody) {

    return;

  }


  let rows = [];

  let availableCount = 0;


  PUJA_DATES.forEach(
    day => {

      for (
        let slotNumber = 1;
        slotNumber <= 3;
        slotNumber++
      ) {

        const booking =
          pujaBookings.find(
            item =>
              item.seva_date ===
                day.date &&
              Number(
                item.slot_number
              ) === slotNumber
          );


        if (booking) {

          rows.push({

            day,

            slotNumber,

            booking

          });

        }
        else {

          availableCount++;

          rows.push({

            day,

            slotNumber,

            booking: null

          });

        }

      }

    }
  );


  const count =
    document.getElementById(
      "availableSlotCount"
    );

  if (count) {

    count.textContent =
      availableCount;

  }


  tbody.innerHTML =
    rows.map(
      row => {

        if (row.booking) {

          const b =
            row.booking;

          return `

            <tr>

              <td>
                <strong>
                  ${escapeHtml(
                    row.day.label
                  )}
                </strong>
              </td>

              <td>
                Slot ${row.slotNumber}
              </td>

              <td>
                <strong>
                  ${escapeHtml(
                    b.flat_number
                  )}
                </strong>
              </td>

              <td>

                <strong>
                  ${escapeHtml(
                    b.family_name
                  )}
                </strong>

                ${
                  b.notes
                    ? `
                      <small
                        style="
                          display:block;
                          color:var(--muted);
                          font-size:.65rem;
                        ">

                        ${escapeHtml(
                          b.notes
                        )}

                      </small>
                    `
                    : ""
                }

              </td>

              <td>

                ${escapeHtml(
                  b.notes ||
                  "Puja Seva"
                )}

                <span class="badge-confirmed">
                  Confirmed
                </span>

              </td>

              <td>

                ${
                  isAdmin
                    ? `

                      <button
                        class="btn-slot-action btn-slot-edit"
                        onclick="openPujaEdit('${b.id}')">

                        <span
                          class="material-symbols-outlined"
                          style="font-size:14px">

                          edit

                        </span>

                        Update

                      </button>

                    `
                    : `

                      <span class="badge-confirmed">
                        Booked
                      </span>

                    `
                }

              </td>

            </tr>

          `;

        }


        return `

          <tr class="row-vacant">

            <td>

              <strong>
                ${escapeHtml(
                  row.day.label
                )}
              </strong>

            </td>

            <td>
              Slot ${row.slotNumber}
            </td>

            <td>—</td>

            <td>

              <span class="badge-vacant">
                Available
              </span>

            </td>

            <td>
              Puja Seva
            </td>

            <td>

              ${
                isAdmin
                  ? `
                    <button
                      class="btn-slot-action btn-slot-book admin-only-control"
                      onclick="openPujaBooking('${row.day.date}',${row.slotNumber})">
                      <span class="material-symbols-outlined" style="font-size:14px">add_circle</span>
                      Book Slot
                    </button>
                  `
                  : `
                    <span class="admin-only-note">Admin booking only</span>
                  `
              }

            </td>

          </tr>

        `;

      }
    ).join("");

}


window.openPujaBooking =
  function (
    date,
    slotNumber
  ) {

    if (!isAdmin) {
      showToast("Only the admin can book Puja Seva slots.", "error");
      return;
    }

    currentPujaRecord =
      null;

    document
      .getElementById(
        "slotModalTitle"
      )
      .textContent =
      "Book Puja Seva";


    document
      .getElementById(
        "slotIdInput"
      )
      .value = "";


    document
      .getElementById(
        "slotDateInput"
      )
      .value =
      date;


    document
      .getElementById(
        "slotNumberInput"
      )
      .value =
      String(slotNumber);


    document
      .getElementById(
        "flatNumberInput"
      )
      .value = "";


    document
      .getElementById(
        "familyYajamanInput"
      )
      .value = "";


    document
      .getElementById(
        "sevaPreferenceInput"
      )
      .value =
      "Puja Seva";


    document
      .getElementById(
        "gotramInput"
      )
      .value = "";


    document
      .getElementById(
        "clearSlotBtn"
      )
      .style.display =
      "none";


    openModal(
      document.getElementById(
        "slotModal"
      )
    );

  };


window.openPujaEdit =
  async function (id) {

    if (!isAdmin) {

      openAdminLoginModal();

      return;

    }


    const booking =
      pujaBookings.find(
        item =>
          item.id === id
      );

    if (!booking) {

      return;

    }


    currentPujaRecord =
      booking;


    document
      .getElementById(
        "slotModalTitle"
      )
      .textContent =
      "Update Puja Seva";


    document
      .getElementById(
        "slotIdInput"
      )
      .value =
      booking.id;


    document
      .getElementById(
        "slotDateInput"
      )
      .value =
      booking.seva_date;


    document
      .getElementById(
        "slotNumberInput"
      )
      .value =
      String(
        booking.slot_number
      );


    document
      .getElementById(
        "flatNumberInput"
      )
      .value =
      booking.flat_number ||
      "";


    document
      .getElementById(
        "familyYajamanInput"
      )
      .value =
      booking.family_name ||
      "";


    document
      .getElementById(
        "sevaPreferenceInput"
      )
      .value =
      booking.notes ||
      "Puja Seva";


    document
      .getElementById(
        "gotramInput"
      )
      .value = "";


    document
      .getElementById(
        "clearSlotBtn"
      )
      .style.display =
      "inline-flex";


    openModal(
      document.getElementById(
        "slotModal"
      )
    );

  };


window.saveSlotDetails =
  async function (event) {

    event.preventDefault();

    if (!isAdmin) {
      showToast("Only the admin can book or update Puja Seva slots.", "error");
      return;
    }


    const date =
      document
        .getElementById(
          "slotDateInput"
        )
        .value;

    const slotNumber =
      Number(
        document
          .getElementById(
            "slotNumberInput"
          )
          .value
      );

    const flat =
      document
        .getElementById(
          "flatNumberInput"
        )
        .value
        .trim();

    const family =
      document
        .getElementById(
          "familyYajamanInput"
        )
        .value
        .trim();

    const seva =
      document
        .getElementById(
          "sevaPreferenceInput"
        )
        .value
        .trim();

    const gotram =
      document
        .getElementById(
          "gotramInput"
        )
        .value
        .trim();


    if (!date || !flat || !family) {

      showToast(
        "Please enter date, flat number and family name.",
        "info"
      );

      return;

    }


    const payload = {

      seva_date:
        date,

      slot_number:
        slotNumber,

      flat_number:
        flat,

      family_name:
        family,

      notes:
        [
          seva,
          gotram
            ? `Gotram: ${gotram}`
            : ""
        ]
        .filter(Boolean)
        .join(" • ")

    };


    try {

      if (
        currentPujaRecord &&
        currentPujaRecord.id
      ) {

        if (!isAdmin) {

          showToast(
            "Only the admin can update an existing booking.",
            "error"
          );

          return;

        }


        const {
          error
        } =
          await supabaseClient

            .from("puja_seva")

            .update(payload)

            .eq(
              "id",
              currentPujaRecord.id
            );


        if (error) {

          throw error;

        }


        showToast(
          "Puja Seva booking updated."
        );

      }
      else {

        const {
          error
        } =
          await supabaseClient

            .from("puja_seva")

            .insert(payload);


        if (error) {

          if (
            error.code === "23505"
          ) {

            showToast(
              "This Puja slot has already been booked. Please choose another slot.",
              "error"
            );

            return;

          }

          throw error;

        }


        showToast(
          "Puja Seva slot booked successfully."
        );

      }


      closeSlotModal();

      await loadPujaBookings();

    }
    catch (error) {

      console.warn("save puja booking notice:", error);

      showToast(
        error.message ||
        "Unable to save Puja booking.",
        "error"
      );

    }

  };


window.clearSlotBooking =
  async function () {

    if (
      !isAdmin ||
      !currentPujaRecord
    ) {

      return;

    }


    if (
      !confirm(
        "Mark this Puja slot as vacant?"
      )
    ) {

      return;

    }


    try {

      const {
        error
      } =
        await supabaseClient

          .from("puja_seva")

          .delete()

          .eq(
            "id",
            currentPujaRecord.id
          );


      if (error) {

        throw error;

      }


      closeSlotModal();

      await loadPujaBookings();

      showToast(
        "Puja slot is now available.",
        "info"
      );

    }
    catch (error) {

      console.warn("delete puja slot notice:", error);

      showToast(
        error.message ||
        "Unable to clear slot.",
        "error"
      );

    }

  };


window.closeSlotModal =
  function () {

    closeModal(
      document.getElementById(
        "slotModal"
      )
    );

    currentPujaRecord =
      null;

  };


/* =========================================================
   ANNADANAM
   ========================================================= */

async function loadAnnadanamDonors() {
  try {
    if (supabaseClient) {
      const {
        data,
        error
      } =
        await supabaseClient
          .from("annadanam_donors")
          .select(
            `
              id,
              flat_number,
              family_name,
              contact_number,
              notes,
              slot_id,
              created_at,
              annadanam_slots (
                slot_number
              )
            `
          )
          .order("created_at", { ascending: true });

      if (!error && Array.isArray(data)) {
        annadanamDonors = data;
        renderAnnadanamTable();
        return;
      }
    }
  } catch (error) {
    console.warn("Supabase annadanam load warning:", error);
  }

  // Fallback to local server API
  try {
    const res = await safeFetch("/api/annadanam");
    if (res && res.ok) {
      const annadanamData = await res.json();
      if (Array.isArray(annadanamData)) {
        annadanamDonors = annadanamData;
        renderAnnadanamTable();
        return;
      }
    }
  } catch (e) {
    console.warn("Local annadanam fallback warning:", e);
  }

  annadanamDonors = [];
  renderAnnadanamTable();
}


function renderAnnadanamTable() {

  const tbody =
    document.getElementById(
      "annadanamTableBody"
    );

  if (!tbody) {

    return;

  }


  const grouped =
    ANNADANAM_ITEMS.map(
      (
        item,
        index
      ) => {

        const slotNumber =
          index + 1;

        const donors =
          annadanamDonors.filter(
            donor =>
              Number(
                donor
                  .annadanam_slots
                  ?.slot_number
              ) === slotNumber
          );


        return {
          item,
          slotNumber,
          donors
        };

      }
    );


  tbody.innerHTML =
    grouped.map(
      group => {

        const donorText =
          group.donors.length
            ? group.donors
                .map(
                  donor =>
                    `${escapeHtml(
                      donor.family_name
                    )} · Flat ${escapeHtml(
                      donor.flat_number
                    )}`
                )
                .join("<br>")
            : `
              <span class="badge-vacant">
                Open for Support
              </span>
            `;


        const action =
          isAdmin
            ? `
              <button
                class="btn-slot-action btn-slot-book admin-only-control"
                onclick="openAnnadanamModal('${group.slotNumber}')">
                <span class="material-symbols-outlined" style="font-size:14px">volunteer_activism</span>
                Book Slot
              </button>
            `
            : `<span class="admin-only-note">Admin booking only</span>`;


        return `

          <tr>

            <td>

              ${
                group.donors.length
                  ? `
                    <strong>
                      ${donorText}
                    </strong>
                  `
                  : `
                    <span
                      style="
                        font-weight:800;
                      ">

                      Available

                    </span>
                  `
              }

            </td>

            <td>

              ${
                group.donors.length
                  ? group.donors
                      .map(
                        donor =>
                          escapeHtml(
                            donor.flat_number
                          )
                      )
                      .join("<br>")
                  : "—"
              }

            </td>

            <td>

              <strong>
                ${escapeHtml(
                  group.item
                )}
              </strong>

              <small
                style="
                  display:block;
                  color:var(--muted);
                  margin-top:3px;
                ">

                Slot ${group.slotNumber}

              </small>

            </td>

            <td>

              ${action}

            </td>

          </tr>

        `;

      }
    ).join("");

}


window.openAnnadanamModal =
  async function (
    slotNumber
  ) {

    if (!isAdmin) {
      showToast("Only the admin can book Annadanam slots.", "error");
      return;
    }

    currentAnnadanamSlot =
      Number(slotNumber);


    document
      .getElementById(
        "annadanamSlotIdInput"
      )
      .value =
      String(slotNumber);


    document
      .getElementById(
        "annadanamFlatInput"
      )
      .value = "";


    document
      .getElementById(
        "annadanamDonorInput"
      )
      .value = "";


    document
      .getElementById(
        "annadanamNotesInput"
      )
      .value = "";


    openModal(
      document.getElementById(
        "annadanamModal"
      )
    );

  };


window.saveAnnadanamSponsorship =
  async function (event) {

    event.preventDefault();

    if (!isAdmin) {
      showToast("Only the admin can book Annadanam slots.", "error");
      return;
    }


    const slotNumber =
      Number(
        document
          .getElementById(
            "annadanamSlotIdInput"
          )
          .value
      );

    const flat =
      document
        .getElementById(
          "annadanamFlatInput"
        )
        .value
        .trim();

    const donor =
      document
        .getElementById(
          "annadanamDonorInput"
        )
        .value
        .trim();

    const notes =
      document
        .getElementById(
          "annadanamNotesInput"
        )
        .value
        .trim();


    if (
      !slotNumber ||
      !flat ||
      !donor
    ) {

      showToast(
        "Please enter flat number and sponsor name.",
        "info"
      );

      return;

    }


    try {

      const {
        data: slot,
        error: slotError
      } =
        await supabaseClient

          .from(
            "annadanam_slots"
          )

          .select("id")

          .eq(
            "slot_number",
            slotNumber
          )

          .maybeSingle();


      if (slotError) {

        throw slotError;

      }


      if (!slot) {

        throw new Error(
          "Annadanam slot is not available."
        );

      }


      const {
        error
      } =
        await supabaseClient

          .from(
            "annadanam_donors"
          )

          .insert({

            slot_id:
              slot.id,

            flat_number:
              flat,

            family_name:
              donor,

            notes:
              notes || null

          });


      if (error) {

        throw error;

      }


      closeAnnadanamModal();

      await loadAnnadanamDonors();

      showToast(
        "Annadanam support registered successfully."
      );

    }
    catch (error) {

      console.warn("save annadanam notice:", error);

      showToast(
        error.message ||
        "Unable to register Annadanam support.",
        "error"
      );

    }

  };


window.closeAnnadanamModal =
  function () {

    closeModal(
      document.getElementById(
        "annadanamModal"
      )
    );

    currentAnnadanamSlot =
      null;

  };


/* =========================================================
   SCHEDULE
   ========================================================= */

function renderSchedule(
  filter = "all"
) {

  const container =
    document.getElementById(
      "scheduleCardsContainer"
    );

  if (!container) {

    return;

  }


  const filtered =
    scheduleData.filter(
      item =>
        filter === "all" ||
        item.category.includes(
          filter
        )
    );


  container.innerHTML =
    filtered.map(
      item => {

        const badgeClass =
          item.badgeType === "crimson"
            ? "badge-day-crimson"
            : item.badgeType === "saffron"
              ? "badge-day-saffron"
              : "badge-day-gold";

        const themeClass =
          item.theme || "theme-8d-amber";

        const iconName =
          item.icon || "celebration";


        return `

          <article
            class="
              schedule-card
              card-8d
              ${themeClass}
              ${
                item.isHighlight
                  ? "highlight-8d"
                  : ""
              }
            ">

            <div class="card-8d-mesh" aria-hidden="true"></div>
            <div class="card-8d-shimmer" aria-hidden="true"></div>
            <div class="card-8d-glow-orb" aria-hidden="true"></div>

            <div
              class="card-accent-bar"
              aria-hidden="true">
            </div>

            <div class="schedule-card-header">

              <div class="schedule-badge-cluster">

                <span
                  class="
                    schedule-day-badge
                    ${badgeClass}
                  ">

                  <span class="day-badge-dot" aria-hidden="true"></span>

                  ${escapeHtml(
                    item.dayNumber
                  )}
                  •
                  ${escapeHtml(
                    item.date
                  )}

                </span>

                <span class="schedule-tag">

                  ${escapeHtml(
                    item.badgeText
                  )}

                </span>

                ${
                  item.isHighlight
                    ? `<span class="schedule-highlight-pill" aria-label="Grand community feast highlight">
                        <span class="material-symbols-outlined" style="font-size:12px;vertical-align:middle;margin-right:3px;">star</span>Special Seva
                       </span>`
                    : ""
                }

              </div>

              <div class="card-8d-icon-orb" aria-hidden="true">

                <span class="material-symbols-outlined">

                  ${iconName}

                </span>

              </div>

            </div>

            <h3 class="schedule-card-title">

              ${escapeHtml(
                item.title
              )}

            </h3>

            <div class="schedule-meta">

              <div class="meta-item meta-item-time">

                <span
                  class="material-symbols-outlined">

                  schedule

                </span>

                <strong>

                  ${escapeHtml(
                    item.time
                  )}

                </strong>

              </div>


              <div class="meta-item meta-item-loc">

                <span
                  class="material-symbols-outlined">

                  location_on

                </span>

                <span>

                  ${escapeHtml(
                    item.location
                  )}

                </span>

              </div>

            </div>

            <p class="schedule-card-desc">

              ${escapeHtml(
                item.description
              )}

            </p>

          </article>

        `;

      }
    ).join("");

}


window.filterSchedule =
  function (category) {

    document
      .querySelectorAll(
        ".schedule-filter-btn"
      )
      .forEach(
        button => {

          button.classList.toggle(
            "active",
            button.dataset.filter ===
              category
          );

        }
      );

    renderSchedule(
      category
    );

  };


/* =========================================================
   NAVIGATION
   ========================================================= */

function setupMobileNav() {

  const toggle =
    document.getElementById(
      "mobileMenuBtn"
    );

  const drawer =
    document.getElementById(
      "mobileDrawer"
    );

  const icon =
    document.getElementById(
      "menuIcon"
    );

  if (!toggle || !drawer) {

    return;

  }


  toggle.addEventListener(
    "click",
    () => {

      const open =
        drawer.classList.toggle(
          "open"
        );

      if (icon) {

        icon.textContent =
          open
            ? "close"
            : "menu";

      }

      toggle.setAttribute(
        "aria-expanded",
        String(open)
      );

    }
  );


  drawer
    .querySelectorAll("a")
    .forEach(
      link => {

        link.addEventListener(
          "click",
          () => {

            drawer.classList.remove(
              "open"
            );

            if (icon) {

              icon.textContent =
                "menu";

            }

            toggle.setAttribute(
              "aria-expanded",
              "false"
            );

          }
        );

      }
    );

}


function setupScrollSpy() {

  const sections =
    [
      ...document.querySelectorAll(
        "section[id]"
      )
    ];

  const links =
    [
      ...document.querySelectorAll(
        ".desktop-nav .nav-link"
      )
    ];


  if (
    !sections.length ||
    !links.length
  ) {

    return;

  }


  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(
          entry => {

            if (
              !entry.isIntersecting
            ) {

              return;

            }

            links.forEach(
              link => {

                link.classList.toggle(
                  "active",
                  link.getAttribute(
                    "href"
                  ) ===
                    `#${entry.target.id}`
                );

              }
            );

          }
        );

      },
      {
        rootMargin:
          "-25% 0px -65% 0px",

        threshold: 0
      }
    );


  sections.forEach(
    section =>
      observer.observe(
        section
      )
  );

}


/* =========================================================
   MODAL HELPERS
   ========================================================= */

function openModal(modal) {

  if (!modal) {

    return;

  }

  modal.classList.add(
    "open"
  );

  document.body.classList.add(
    "modal-open"
  );

}


function closeModal(modal) {

  if (!modal) {

    return;

  }

  modal.classList.remove(
    "open"
  );

  if (
    !document.querySelector(
      ".modal.open"
    )
  ) {

    document.body.classList.remove(
      "modal-open"
    );

  }

}


function setupModalAccessibility() {

  document.addEventListener(
    "click",
    event => {

      const modals = [

        "adminLoginModal",

        "galleryModal",

        "slotModal",

        "annadanamModal",

        "photoUploadModal",

        "carouselModal"

      ];


      modals.forEach(
        id => {

          const modal =
            document.getElementById(
              id
            );

          if (
            event.target ===
            modal
          ) {

            closeModal(
              modal
            );

          }

        }
      );

    }
  );


  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key !==
        "Escape"
      ) {

        return;

      }


      const open =
        document.querySelector(
          ".modal.open"
        );


      if (open) {

        closeModal(
          open
        );

      }

    }
  );

}


/* =========================================================
   UTILITIES
   ========================================================= */

function escapeHtml(
  value = ""
) {

  return String(value)
    .replace(
      /[&<>"']/g,
      char => ({

        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"

      }[char])
    );

}


function clone(value) {

  return JSON.parse(
    JSON.stringify(value)
  );

}


function showToast(
  message,
  type = "success"
) {

  const container =
    document.getElementById(
      "toastContainer"
    );

  if (!container) {

    return;

  }


  const icon =
    type === "success"
      ? "check_circle"
      : type === "error"
        ? "error"
        : "info";


  const toast =
    document.createElement(
      "div"
    );

  toast.className =
    `toast ${type}`;


  toast.innerHTML = `

    <span
      class="material-symbols-outlined">

      ${icon}

    </span>

    <span>
      ${escapeHtml(message)}
    </span>

  `;


  container.appendChild(
    toast
  );


  setTimeout(
    () => {

      toast.style.opacity =
        "0";

      toast.style.transform =
        "translateY(10px)";

      toast.style.transition =
        "all .25s ease";


      setTimeout(
        () => toast.remove(),
        250
      );

    },
    3500
  );

}


/* =========================================================
   SUPABASE AUTH LISTENER
   ========================================================= */

if (supabaseClient && supabaseClient.auth && typeof supabaseClient.auth.onAuthStateChange === "function") {
  try {
    supabaseClient.auth.onAuthStateChange(
      async (event, session) => {
        try {
          if (session) {
            currentUser = session.user;
            if (event === "SIGNED_IN") {
              await checkAdminSession();
            }
          } else {
            currentUser = null;
            setAdminState(false);
          }
        } catch (e) {
          console.warn("Auth state change callback error:", e);
        }
      }
    );
  } catch (err) {
    console.warn("Failed to attach auth state change listener:", err);
  }
}

/* =========================================================
   FESTIVAL EFFECTS
   ========================================================= */

let templeBellAudio = null;
window.ringTempleBell = function () {
  const button = document.getElementById("templeBellBtn");
  if (button) {
    button.classList.remove("bell-ringing");
    void button.offsetWidth;
    button.classList.add("bell-ringing");
    setTimeout(() => button.classList.remove("bell-ringing"), 850);
  }

  try {
    if (!templeBellAudio) {
      templeBellAudio = new Audio("temple-bell-10s.wav");
      templeBellAudio.preload = "auto";
      templeBellAudio.volume = 0.9;
    }
    templeBellAudio.currentTime = 0;
    const playPromise = templeBellAudio.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(err => console.warn("Temple bell playback blocked", err));
    }
  } catch (err) {
    console.warn("Temple bell sound unavailable", err);
  }
};

window.scatterFlowers = function () {
  let layer = document.querySelector(".flower-shower-layer");
  if (!layer) {
    layer = document.createElement("div");
    layer.className = "flower-shower-layer";
    layer.setAttribute("aria-hidden", "true");
    document.body.appendChild(layer);
  }
  const flowers = ["🌸", "🌼", "🌺", "🪷", "🌻"];
  for (let i = 0; i < 28; i++) {
    const el = document.createElement("span");
    el.className = "falling-flower";
    el.textContent = flowers[Math.floor(Math.random() * flowers.length)];
    el.style.left = `${Math.random() * 100}vw`;
    el.style.fontSize = `${16 + Math.random() * 18}px`;
    el.style.animationDuration = `${2.8 + Math.random() * 2.6}s`;
    el.style.animationDelay = `${Math.random() * 0.7}s`;
    el.style.setProperty("--drift", `${-120 + Math.random() * 240}px`);
    el.style.setProperty("--rotation", `${Math.random() * 360}deg`);
    layer.appendChild(el);
    setTimeout(() => el.remove(), 6500);
  }
};

/* Rat removed — festival page intentionally has no wandering rat. */

