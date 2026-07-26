import QRCode from "qrcode";
import "./style.css";

/*
  TỌA ĐỘ ĐƯỢC ĐO THEO 6 ẢNH GỐC TRONG public/templates.
  qr: vùng sẽ được thay bằng mã QR mới.
  pill: vùng dòng link màu xanh bên dưới QR.
*/
const TEMPLATES = [
  {
    id: 1,
    name: "Mẫu 1 – Trung tâm nổi bật",
    src: "/templates/mau-1.png",
    width: 1448,
    height: 1086,
    qr: { x: 111, y: 404, w: 218, h: 218 },
    pill: {
      x: 61, y: 641, w: 324, h: 50,
      colorStart: "#082b91",
      colorEnd: "#0b55e9"
    }
  },
  {
    id: 2,
    name: "Mẫu 2 – Phong cách truyện tranh",
    src: "/templates/mau-2.png",
    width: 1448,
    height: 1086,
    qr: { x: 141, y: 375, w: 220, h: 211 },
    pill: {
      x: 50, y: 613, w: 403, h: 46,
      colorStart: "#052ab1",
      colorEnd: "#075fe6"
    }
  },
  {
    id: 3,
    name: "Mẫu 3 – Bố cục dọc",
    src: "/templates/mau-3.png",
    width: 1122,
    height: 1402,
    qr: { x: 689, y: 343, w: 266, h: 266 },
    pill: {
      x: 224, y: 399, w: 382, h: 42,
      colorStart: "#0750e6",
      colorEnd: "#0868f5"
    }
  },
  {
    id: 4,
    name: "Mẫu 4 – Trắng xanh hiện đại",
    src: "/templates/mau-4.png",
    width: 1448,
    height: 1086,
    qr: { x: 130, y: 346, w: 253, h: 255 },
    pill: {
      x: 65, y: 636, w: 382, h: 45,
      colorStart: "#0641c9",
      colorEnd: "#0874ee"
    }
  },
  {
    id: 5,
    name: "Mẫu 5 – Nhiều màu",
    src: "/templates/mau-5.png",
    width: 1448,
    height: 1086,
    qr: { x: 128, y: 318, w: 263, h: 266 },
    pill: {
      x: 94, y: 596, w: 329, h: 39,
      colorStart: "#071c9f",
      colorEnd: "#0d48dd"
    }
  },
  {
    id: 6,
    name: "Mẫu 6 – Xanh vàng tối giản",
    src: "/templates/mau-6.png",
    width: 1448,
    height: 1086,
    qr: { x: 155, y: 352, w: 230, h: 231 },
    pill: {
      x: 85, y: 613, w: 365, h: 38,
      colorStart: "#041a47",
      colorEnd: "#0a326d"
    }
  }
];

const elements = {
  urlInput: document.querySelector("#urlInput"),
  pasteButton: document.querySelector("#pasteButton"),
  replaceTextCheckbox: document.querySelector("#replaceTextCheckbox"),
  urlMessage: document.querySelector("#urlMessage"),
  templateGrid: document.querySelector("#templateGrid"),
  generateButton: document.querySelector("#generateButton"),
  downloadButton: document.querySelector("#downloadButton"),
  statusMessage: document.querySelector("#statusMessage"),
  previewCanvas: document.querySelector("#previewCanvas"),
  previewTitle: document.querySelector("#previewTitle"),
  imageSizeBadge: document.querySelector("#imageSizeBadge"),
  loadingOverlay: document.querySelector("#loadingOverlay")
};

const state = {
  selectedTemplateId: 1,
  lastGeneratedBlob: null,
  lastGeneratedFilename: null,
  imageCache: new Map()
};

function getSelectedTemplate() {
  return TEMPLATES.find((template) => template.id === state.selectedTemplateId);
}

function setMessage(element, text = "", type = "") {
  element.textContent = text;
  element.className = element === elements.urlMessage
    ? `message ${type}`.trim()
    : `status-message ${type}`.trim();
}

function normalizeUrl(rawValue) {
  const trimmed = rawValue.trim();

  if (!trimmed) {
    throw new Error("Bạn chưa nhập đường link.");
  }

  let candidate = trimmed;

  // Hỗ trợ trường hợp người dùng dán link thiếu https://
  if (!/^https?:\/\//i.test(candidate)) {
    candidate = `https://${candidate}`;
  }

  let parsed;
  try {
    parsed = new URL(candidate);
  } catch {
    throw new Error("Đường link không hợp lệ.");
  }

  if (!["http:", "https:"].includes(parsed.protocol)) {
    throw new Error("Chỉ hỗ trợ đường link bắt đầu bằng http:// hoặc https://.");
  }

  return parsed.href;
}

function isShopeeUrl(url) {
  try {
    const host = new URL(url).hostname.toLowerCase();
    return host.includes("shopee.");
  } catch {
    return false;
  }
}

function createTemplateCards() {
  elements.templateGrid.innerHTML = "";

  for (const template of TEMPLATES) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "template-card";
    button.dataset.templateId = String(template.id);
    button.setAttribute("aria-label", `Chọn ${template.name}`);

    button.innerHTML = `
      <div class="template-card__image-wrap">
        <img
          src="${template.src}"
          alt="${template.name}"
          loading="lazy"
          draggable="false"
        />
        <span class="template-card__check">✓</span>
      </div>
      <div class="template-card__meta">
        <strong>Mẫu ${template.id}</strong>
        <span>${template.width} × ${template.height}</span>
      </div>
    `;

    button.addEventListener("click", async () => {
      state.selectedTemplateId = template.id;
      state.lastGeneratedBlob = null;
      state.lastGeneratedFilename = null;
      elements.downloadButton.disabled = true;

      updateSelectedCard();
      updatePreviewHeader();
      setMessage(elements.statusMessage);
      await showBaseTemplate(template);
    });

    elements.templateGrid.appendChild(button);
  }

  updateSelectedCard();
}

function updateSelectedCard() {
  document.querySelectorAll(".template-card").forEach((card) => {
    const isSelected =
      Number(card.dataset.templateId) === state.selectedTemplateId;
    card.classList.toggle("selected", isSelected);
    card.setAttribute("aria-pressed", String(isSelected));
  });
}

function updatePreviewHeader() {
  const template = getSelectedTemplate();
  elements.previewTitle.textContent = template.name;
  elements.imageSizeBadge.textContent = `${template.width} × ${template.height}`;
}

function loadImage(src) {
  if (state.imageCache.has(src)) {
    return state.imageCache.get(src);
  }

  const promise = new Promise((resolve, reject) => {
    const image = new Image();
    image.decoding = "async";

    image.onload = () => resolve(image);
    image.onerror = () => reject(
      new Error(`Không tải được ảnh mẫu: ${src}`)
    );

    image.src = src;
  });

  state.imageCache.set(src, promise);
  return promise;
}

async function showBaseTemplate(template) {
  try {
    setLoading(true);
    const image = await loadImage(template.src);
    const canvas = elements.previewCanvas;
    const context = canvas.getContext("2d");

    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0);
  } catch (error) {
    setMessage(elements.statusMessage, error.message, "error");
  } finally {
    setLoading(false);
  }
}

function roundedRectPath(context, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);

  context.beginPath();
  context.moveTo(x + r, y);
  context.lineTo(x + width - r, y);
  context.quadraticCurveTo(x + width, y, x + width, y + r);
  context.lineTo(x + width, y + height - r);
  context.quadraticCurveTo(
    x + width,
    y + height,
    x + width - r,
    y + height
  );
  context.lineTo(x + r, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - r);
  context.lineTo(x, y + r);
  context.quadraticCurveTo(x, y, x + r, y);
  context.closePath();
}

function drawLinkIcon(context, centerX, centerY, size) {
  const lineWidth = Math.max(2, size * 0.11);

  context.save();
  context.translate(centerX, centerY);
  context.rotate(-Math.PI / 4);
  context.strokeStyle = "#ffffff";
  context.lineWidth = lineWidth;
  context.lineCap = "round";
  context.lineJoin = "round";

  roundedRectPath(
    context,
    -size * 0.47,
    -size * 0.17,
    size * 0.58,
    size * 0.34,
    size * 0.16
  );
  context.stroke();

  roundedRectPath(
    context,
    -size * 0.11,
    -size * 0.17,
    size * 0.58,
    size * 0.34,
    size * 0.16
  );
  context.stroke();

  context.beginPath();
  context.moveTo(-size * 0.12, 0);
  context.lineTo(size * 0.12, 0);
  context.stroke();

  context.restore();
}

function ellipsizeText(context, text, maxWidth) {
  if (context.measureText(text).width <= maxWidth) {
    return text;
  }

  let result = text;
  while (
    result.length > 4 &&
    context.measureText(`${result}…`).width > maxWidth
  ) {
    result = result.slice(0, -1);
  }

  return `${result}…`;
}

function drawLinkPill(context, pill, url) {
  const radius = pill.h / 2;
  const gradient = context.createLinearGradient(
    pill.x,
    pill.y,
    pill.x + pill.w,
    pill.y
  );

  gradient.addColorStop(0, pill.colorStart);
  gradient.addColorStop(1, pill.colorEnd);

  context.save();

  // Che toàn bộ pill cũ rồi vẽ lại để không còn sót chữ link mẫu.
  roundedRectPath(context, pill.x, pill.y, pill.w, pill.h, radius);
  context.fillStyle = gradient;
  context.fill();

  context.strokeStyle = "rgba(255,255,255,0.22)";
  context.lineWidth = Math.max(1, pill.h * 0.035);
  context.stroke();

  const iconSize = pill.h * 0.55;
  const iconCenterX = pill.x + pill.h * 0.55;
  const iconCenterY = pill.y + pill.h / 2;

  drawLinkIcon(context, iconCenterX, iconCenterY, iconSize);

  const textX = pill.x + pill.h * 1.03;
  const rightPadding = pill.h * 0.28;
  const maxTextWidth = pill.x + pill.w - rightPadding - textX;
  const maxFontSize = Math.floor(pill.h * 0.50);
  const minFontSize = Math.max(11, Math.floor(pill.h * 0.32));

  let fontSize = maxFontSize;
  context.font = `700 ${fontSize}px Arial, Helvetica, sans-serif`;

  while (
    fontSize > minFontSize &&
    context.measureText(url).width > maxTextWidth
  ) {
    fontSize -= 1;
    context.font = `700 ${fontSize}px Arial, Helvetica, sans-serif`;
  }

  const displayText = ellipsizeText(context, url, maxTextWidth);

  context.fillStyle = "#ffffff";
  context.textAlign = "left";
  context.textBaseline = "middle";
  context.shadowColor = "rgba(0,0,0,0.18)";
  context.shadowBlur = 1;
  context.fillText(displayText, textX, pill.y + pill.h / 2 + 0.5);

  context.restore();
}

async function buildCompositeImage(url, template) {
  const templateImage = await loadImage(template.src);
  const outputCanvas = document.createElement("canvas");
  const context = outputCanvas.getContext("2d", { alpha: false });

  outputCanvas.width = templateImage.naturalWidth;
  outputCanvas.height = templateImage.naturalHeight;

  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, outputCanvas.width, outputCanvas.height);
  context.drawImage(templateImage, 0, 0);

  const qrCanvas = document.createElement("canvas");
  const qrRenderSize = Math.max(template.qr.w, template.qr.h);

  await QRCode.toCanvas(qrCanvas, url, {
    errorCorrectionLevel: "M",
    margin: 2,
    width: qrRenderSize,
    color: {
      dark: "#000000",
      light: "#ffffff"
    }
  });

  /*
    Phủ trắng vùng QR cũ trước, sau đó đặt QR mới.
    imageSmoothingEnabled = false giúp các ô QR giữ cạnh sắc nét.
  */
  context.fillStyle = "#ffffff";
  context.fillRect(
    template.qr.x,
    template.qr.y,
    template.qr.w,
    template.qr.h
  );

  context.imageSmoothingEnabled = false;
  context.drawImage(
    qrCanvas,
    template.qr.x,
    template.qr.y,
    template.qr.w,
    template.qr.h
  );
  context.imageSmoothingEnabled = true;

  if (elements.replaceTextCheckbox.checked) {
    drawLinkPill(context, template.pill, url);
  }

  return outputCanvas;
}

function copyCanvasToPreview(sourceCanvas) {
  const preview = elements.previewCanvas;
  const context = preview.getContext("2d");

  preview.width = sourceCanvas.width;
  preview.height = sourceCanvas.height;
  context.clearRect(0, 0, preview.width, preview.height);
  context.drawImage(sourceCanvas, 0, 0);
}

function canvasToBlob(canvas) {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error("Không thể xuất ảnh PNG."));
      }
    }, "image/png");
  });
}

function setLoading(isLoading) {
  elements.loadingOverlay.classList.toggle("hidden", !isLoading);
  elements.generateButton.disabled = isLoading;
  elements.pasteButton.disabled = isLoading;
}

async function generateImage() {
  let url;

  try {
    url = normalizeUrl(elements.urlInput.value);
    elements.urlInput.value = url;

    if (isShopeeUrl(url)) {
      setMessage(elements.urlMessage, "Link Shopee hợp lệ.", "success");
    } else {
      setMessage(
        elements.urlMessage,
        "Link hợp lệ. Công cụ vẫn tạo QR dù đây không phải link Shopee.",
        "warning"
      );
    }
  } catch (error) {
    setMessage(elements.urlMessage, error.message, "error");
    elements.urlInput.focus();
    return;
  }

  const template = getSelectedTemplate();

  try {
    setLoading(true);
    elements.downloadButton.disabled = true;
    setMessage(elements.statusMessage, "Đang tạo mã QR và ghép vào ảnh...", "working");

    const compositeCanvas = await buildCompositeImage(url, template);
    copyCanvasToPreview(compositeCanvas);

    state.lastGeneratedBlob = await canvasToBlob(compositeCanvas);
    state.lastGeneratedFilename = `ma-qr-mau-${template.id}.png`;

    elements.downloadButton.disabled = false;
    setMessage(
      elements.statusMessage,
      `Đã tạo xong ${template.name}. Bạn có thể tải ảnh PNG.`,
      "success"
    );
  } catch (error) {
    console.error(error);
    state.lastGeneratedBlob = null;
    state.lastGeneratedFilename = null;
    elements.downloadButton.disabled = true;
    setMessage(
      elements.statusMessage,
      error?.message || "Có lỗi xảy ra khi tạo ảnh.",
      "error"
    );
  } finally {
    setLoading(false);
  }
}

function downloadGeneratedImage() {
  if (!state.lastGeneratedBlob || !state.lastGeneratedFilename) {
    setMessage(
      elements.statusMessage,
      "Bạn cần tạo ảnh trước khi tải xuống.",
      "warning"
    );
    return;
  }

  const objectUrl = URL.createObjectURL(state.lastGeneratedBlob);
  const anchor = document.createElement("a");

  anchor.href = objectUrl;
  anchor.download = state.lastGeneratedFilename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();

  setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
}

async function pasteFromClipboard() {
  try {
    if (!navigator.clipboard?.readText) {
      throw new Error("Trình duyệt không cho phép đọc clipboard tự động.");
    }

    const text = await navigator.clipboard.readText();
    elements.urlInput.value = text.trim();
    elements.urlInput.focus();
    setMessage(elements.urlMessage, "Đã dán nội dung từ clipboard.", "success");
  } catch {
    setMessage(
      elements.urlMessage,
      "Không thể dán tự động. Hãy nhấn Ctrl + V vào ô link.",
      "warning"
    );
    elements.urlInput.focus();
  }
}

elements.generateButton.addEventListener("click", generateImage);
elements.downloadButton.addEventListener("click", downloadGeneratedImage);
elements.pasteButton.addEventListener("click", pasteFromClipboard);

elements.urlInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    generateImage();
  }
});

elements.urlInput.addEventListener("input", () => {
  state.lastGeneratedBlob = null;
  state.lastGeneratedFilename = null;
  elements.downloadButton.disabled = true;
  setMessage(elements.statusMessage);
});

elements.replaceTextCheckbox.addEventListener("change", () => {
  state.lastGeneratedBlob = null;
  state.lastGeneratedFilename = null;
  elements.downloadButton.disabled = true;
  setMessage(
    elements.statusMessage,
    "Tùy chọn đã thay đổi. Hãy bấm “Tạo ảnh ngay” để cập nhật.",
    "warning"
  );
});

async function initialize() {
  createTemplateCards();
  updatePreviewHeader();
  await showBaseTemplate(getSelectedTemplate());
}

initialize();
