import express, { Request, Response } from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

// High body limit to allow direct image photo uploads (base64 data URLs)
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));

const DATA_DIR = path.join(process.cwd(), "data");
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const GALLERY_FILE = path.join(DATA_DIR, "gallery.json");
const CAROUSEL_FILE = path.join(DATA_DIR, "carousel.json");
const SLOTS_FILE = path.join(DATA_DIR, "slots.json");
const ANNADANAM_FILE = path.join(DATA_DIR, "annadanam.json");

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

const DEFAULT_CAROUSEL = [
  {
    image: "/images/eco_clay_ganesha.jpg",
    tag: "ప్రవీణ్ గారి సమర్పణ (Flat 201) • పూజా వేదిక: గ్రౌండ్ ఫ్లోర్ (Ground Floor)",
    title: "పర్యావరణ హిత 4 అడుగుల మట్టి వినాయకుడు",
    ctaText: "Explore Puja Slots",
    ctaLink: "#puja-annadanam"
  },
  {
    image: "/images/maha_annadanam_feast.jpg",
    tag: "శనివారం 19 సెప్టెంబర్ • మోహన్ రావు గారి మహా అన్నదానం (Flat 101) • వేదిక: గ్రౌండ్ ఫ్లోర్ (Ground Floor)",
    title: "బృహత్ మహా అన్నదానం సమారాధన",
    ctaText: "View Annadanam Details",
    ctaLink: "#puja-annadanam"
  },
  {
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCllnUoaC6qrMkEK_moydxUlHbu-hdkkmC1nO1XoWFeECkypipJ7vdadlpoF155p915hIFAD0hU7ughXi8qy-VxWTAi2vBrVh3NFPQ343I9vygxPgkaNIkq0iXsRba1B5FCfZh1ExnnzXp0uHooPGmz4hN7ylQ7_E3hV6IX2s6cFQkAzF0lSyTibPC78K-sglbYsctQ8UeLXB9OYhmnDUcA8EQPt1gm9JjFDP1ya9XUmPHOWTGbfgNy",
    tag: "ప్రతిరోజూ సాయంత్రం 07:30 PM • వేదిక: గ్రౌండ్ ఫ్లోర్ (Ground Floor)",
    title: "సొసైటీ మహా హారతి & గోత్రార్చన",
    ctaText: "Book Sankalpam Slot",
    ctaLink: "#puja-annadanam"
  },
  {
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD7WXI5MOp9_13R2TiRHCyAAeavOCdMOrgfpn83lXH-9Wd07EsNXU56aca_sVSM6Ia6AD7UNfKGm6TmIINptT6BODrgr3NRkSWQg53pJKvwOCDtfYCA5zQwTtw7W0d5iyfuNXB-Rrn-V7FJTjzuww-XNSXntWOLqEdqDvvrQmDHmvyQNjV0Uy_6a6TaamPBcx1_fuSlpZIauqGSF_izG3DMWp5EQwyZPAqxCwwUrntxaFtz88mwqe0b",
    tag: "పూజా వేదిక: గ్రౌండ్ ఫ్లోర్ (Ground Floor)",
    title: "శ్రీ విఘ్నేశ్వర మండపం 2026 (Ground Floor Mandapam)",
    ctaText: "View Daily Schedule",
    ctaLink: "#schedule"
  }
];

function readJsonFile<T>(filePath: string, fallback: T): T {
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(content) as T;
    }
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
  }
  return fallback;
}

function writeJsonFile<T>(filePath: string, data: T): void {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err);
  }
}

// Ensure initial data exists
if (!fs.existsSync(GALLERY_FILE)) {
  writeJsonFile(GALLERY_FILE, DEFAULT_GALLERY);
}
if (!fs.existsSync(CAROUSEL_FILE)) {
  writeJsonFile(CAROUSEL_FILE, DEFAULT_CAROUSEL);
}

// ---------------------------------------------------------------------------
// REST API ROUTES
// ---------------------------------------------------------------------------

app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Gallery endpoints
app.get("/api/gallery", (_req: Request, res: Response) => {
  const photos = readJsonFile(GALLERY_FILE, DEFAULT_GALLERY);
  res.json(photos);
});

app.post("/api/gallery", (req: Request, res: Response) => {
  const { image, title, tag, alt } = req.body;
  if (!image || !title) {
    return res.status(400).json({ error: "Image and title are required" });
  }

  const currentPhotos = readJsonFile(GALLERY_FILE, DEFAULT_GALLERY);
  const newPhoto = {
    id: "photo_" + Date.now(),
    image,
    title: title.trim(),
    tag: tag ? tag.trim() : "ఉత్సవ వేడుకలు (Festival)",
    alt: alt ? alt.trim() : title.trim(),
    uploadedAt: new Date().toISOString()
  };

  currentPhotos.unshift(newPhoto);
  writeJsonFile(GALLERY_FILE, currentPhotos);
  res.json({ success: true, photo: newPhoto, photos: currentPhotos });
});

app.delete("/api/gallery", (req: Request, res: Response) => {
  const { index, image, id } = req.body;
  let currentPhotos = readJsonFile(GALLERY_FILE, DEFAULT_GALLERY);

  if (typeof id === "string") {
    currentPhotos = currentPhotos.filter((p: any) => p.id !== id);
  } else if (typeof index === "number" && index >= 0 && index < currentPhotos.length) {
    currentPhotos.splice(index, 1);
  } else if (typeof image === "string") {
    currentPhotos = currentPhotos.filter((p: any) => p.image !== image);
  } else {
    return res.status(400).json({ error: "Invalid delete parameter" });
  }

  writeJsonFile(GALLERY_FILE, currentPhotos);
  res.json({ success: true, photos: currentPhotos });
});

app.post("/api/gallery/reset", (_req: Request, res: Response) => {
  writeJsonFile(GALLERY_FILE, DEFAULT_GALLERY);
  res.json({ success: true, photos: DEFAULT_GALLERY });
});

// Carousel endpoints
app.get("/api/carousel", (_req: Request, res: Response) => {
  const slides = readJsonFile(CAROUSEL_FILE, DEFAULT_CAROUSEL);
  res.json(slides);
});

app.post("/api/carousel", (req: Request, res: Response) => {
  const { image, title, tag, ctaText, ctaLink } = req.body;
  if (!image || !title) {
    return res.status(400).json({ error: "Image and title are required" });
  }

  const currentSlides = readJsonFile(CAROUSEL_FILE, DEFAULT_CAROUSEL);
  const newSlide = {
    id: "slide_" + Date.now(),
    image,
    title: title.trim(),
    tag: tag ? tag.trim() : "వేదిక: గ్రౌండ్ ఫ్లోర్ (Ground Floor)",
    ctaText: ctaText ? ctaText.trim() : "View Schedule",
    ctaLink: ctaLink ? ctaLink.trim() : "#schedule",
    uploadedAt: new Date().toISOString()
  };

  currentSlides.unshift(newSlide);
  writeJsonFile(CAROUSEL_FILE, currentSlides);
  res.json({ success: true, slide: newSlide, slides: currentSlides });
});

app.delete("/api/carousel", (req: Request, res: Response) => {
  const { index, id, image } = req.body;
  let currentSlides = readJsonFile(CAROUSEL_FILE, DEFAULT_CAROUSEL);

  if (typeof id === "string") {
    currentSlides = currentSlides.filter((s: any) => s.id !== id);
  } else if (typeof index === "number" && index >= 0 && index < currentSlides.length) {
    currentSlides.splice(index, 1);
  } else if (typeof image === "string") {
    currentSlides = currentSlides.filter((s: any) => s.image !== image);
  } else {
    return res.status(400).json({ error: "Invalid delete parameter" });
  }

  writeJsonFile(CAROUSEL_FILE, currentSlides);
  res.json({ success: true, slides: currentSlides });
});

app.post("/api/carousel/reset", (_req: Request, res: Response) => {
  writeJsonFile(CAROUSEL_FILE, DEFAULT_CAROUSEL);
  res.json({ success: true, slides: DEFAULT_CAROUSEL });
});

// Slots & Annadanam sync endpoints
app.get("/api/slots", (_req: Request, res: Response) => {
  const slots = readJsonFile(SLOTS_FILE, null);
  res.json({ slots });
});

app.post("/api/slots", (req: Request, res: Response) => {
  const { slots } = req.body;
  if (Array.isArray(slots)) {
    writeJsonFile(SLOTS_FILE, slots);
    res.json({ success: true, slots });
  } else {
    res.status(400).json({ error: "Slots array required" });
  }
});

app.get("/api/annadanam", (_req: Request, res: Response) => {
  const items = readJsonFile(ANNADANAM_FILE, null);
  res.json({ items });
});

app.post("/api/annadanam", (req: Request, res: Response) => {
  const { items } = req.body;
  if (Array.isArray(items)) {
    writeJsonFile(ANNADANAM_FILE, items);
    res.json({ success: true, items });
  } else {
    res.status(400).json({ error: "Items array required" });
  }
});

// ---------------------------------------------------------------------------
// VITE MIDDLEWARE & STATIC SERVING
// ---------------------------------------------------------------------------

async function startServer() {
  try {
    if (process.env.NODE_ENV !== "production") {
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "spa",
      });
      app.use(vite.middlewares);
    } else {
      const distPath = path.join(process.cwd(), "dist");
      app.use(express.static(distPath));
      app.get("*", (_req: Request, res: Response) => {
        res.sendFile(path.join(distPath, "index.html"));
      });
    }

    const server = app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running at http://0.0.0.0:${PORT}`);
    });

    server.on("error", (err: any) => {
      console.error("Express server error:", err);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

startServer();
