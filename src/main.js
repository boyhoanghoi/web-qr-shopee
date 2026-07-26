
import QRCode from "qrcode";
import "./style.css";

const TEMPLATES = [
  {
    id: 1, name: "Mẫu 1 – Trắng xanh hiện đại", src: "/templates/mau-1.png",
    width: 1448, height: 1086,
    qr: { x: 155, y: 352, w: 230, h: 231 },
    pill: { x: 85, y: 613, w: 365, h: 38, colorStart: "#041a47", colorEnd: "#0a326d" }
  },
  {
    id: 2, name: "Mẫu 2 – Truyện tranh cam đỏ", src: "/templates/mau-2.png",
    width: 1448, height: 1086,
    qr: { x: 127, y: 318, w: 264, h: 266 },
    pill: { x: 94, y: 596, w: 329, h: 39, colorStart: "#071c9f", colorEnd: "#0d48dd" }
  },
  {
    id: 3, name: "Mẫu 3 – Xanh cam tối giản", src: "/templates/mau-3.png",
    width: 1448, height: 1086,
    qr: { x: 130, y: 346, w: 253, h: 255 },
    pill: { x: 65, y: 636, w: 382, h: 45, colorStart: "#0641c9", colorEnd: "#0874ee" }
  },
  {
    id: 4, name: "Mẫu 4 – Bố cục dọc", src: "/templates/mau-4.png",
    width: 1122, height: 1402,
    qr: { x: 689, y: 343, w: 266, h: 266 },
    pill: { x: 224, y: 399, w: 382, h: 42, colorStart: "#0750e6", colorEnd: "#0868f5" }
  },
  {
    id: 5, name: "Mẫu 5 – Nhiều màu nổi bật", src: "/templates/mau-5.png",
    width: 1448, height: 1086,
    qr: { x: 141, y: 375, w: 220, h: 211 },
    pill: { x: 50, y: 613, w: 403, h: 46, colorStart: "#052ab1", colorEnd: "#075fe6" }
  },
  {
    id: 6, name: "Mẫu 6 – Trung tâm nổi bật", src: "/templates/mau-6.png",
    width: 1448, height: 1086,
    qr: { x: 111, y: 404, w: 218, h: 218 },
    pill: { x: 61, y: 641, w: 324, h: 50, colorStart: "#082b91", colorEnd: "#0b55e9" }
  },
  {
    id: 7, name: "Mẫu 7 – Neon tím", src: "/templates/mau-7.png",
    width: 1122, height: 1402,
    qr: { x: 159, y: 614, w: 287, h: 287 },
    pill: null
  },
  {
    id: 8, name: "Mẫu 8 – Comic vàng đỏ", src: "/templates/mau-8.png",
    width: 1122, height: 1402,
    qr: { x: 168, y: 636, w: 238, h: 236 },
    pill: null
  },
  {
    id: 9, name: "Mẫu 9 – Xanh lá tinh gọn", src: "/templates/mau-9.png",
    width: 1122, height: 1402,
    qr: { x: 137, y: 564, w: 250, h: 255 },
    pill: null
  },
  {
    id: 10, name: "Mẫu 10 – Hồng pastel", src: "/templates/mau-10.png",
    width: 1122, height: 1402,
    qr: { x: 140, y: 600, w: 188, h: 189 },
    pill: null
  },
  {
    id: 11, name: "Mẫu 11 – Xanh dương sáng", src: "/templates/mau-11.png",
    width: 1122, height: 1402,
    qr: { x: 119, y: 639, w: 197, h: 198 },
    pill: null
  },
  {
    id: 12, name: "Mẫu 12 – Xanh đêm vàng", src: "/templates/mau-12.png",
    width: 1122, height: 1402,
    qr: { x: 147, y: 583, w: 234, h: 239 },
    pill: null
  },
  {
    id: 13, name: "Mẫu 13 – Trắng xanh cam đơn giản", src: "/templates/mau-13.png",
    width: 1122, height: 1402,
    qr: { x: 164, y: 711, w: 171, h: 171 },
    pill: null
  },
  {
    id: 14, name: "Mẫu 14 – Xanh lá voucher mở thẳng", src: "/templates/mau-14.png",
    width: 1122, height: 1402,
    qr: { x: 149, y: 598, w: 242, h: 249 },
    pill: null
  },
  {
    id: 15, name: "Mẫu 15 – Xanh vàng 3 bước", src: "/templates/mau-15.png",
    width: 1122, height: 1402,
    qr: { x: 104, y: 689, w: 232, h: 232 },
    pill: null
  },
  {
    id: 16, name: "Mẫu 16 – Xanh ngọc 3 bước", src: "/templates/mau-16.png",
    width: 1122, height: 1402,
    qr: { x: 572, y: 465, w: 178, h: 187 },
    pill: null
  },
  {
    id: 17, name: "Mẫu 17 – Xanh trời cam nổi bật", src: "/templates/mau-17.png",
    width: 1122, height: 1402,
    qr: { x: 131, y: 606, w: 265, h: 271 },
    pill: null
  },
  {
    id: 18, name: "Mẫu 18 – Cam đen 3 bước", src: "/templates/mau-18.png",
    width: 1122, height: 1402,
    qr: { x: 583, y: 427, w: 175, h: 177 },
    pill: null
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
  if (!trimmed) throw new Error("Bạn chưa nhập đường link.");
  let candidate = trimmed;
  if (!/^https?:\/\//i.test(candidate)) candidate = `https://${candidate}`;
  let parsed;
  try { parsed = new URL(candidate); }
  catch { throw new Error("Đường link không hợp lệ."); }

  if (!["http:", "https:"].includes(parsed.protocol)) {
    throw new Error("Chỉ hỗ trợ đường link bắt đầu bằng http:// hoặc https://.");
  }
  return parsed.href;
}

function isShopeeUrl(url) {
  try { return new URL(url).hostname.toLowerCase().includes("shopee."); }
  catch { return false; }
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
        <img src="${template.src}" alt="${template.name}" loading="lazy" draggable="false" />
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
    const isSelected = Number(card.dataset.templateId) === state.selectedTemplateId;
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
  if (state.imageCache.has(src)) return state.imageCache.get(src);

  const promise = new Promise((resolve, reject) => {
    const image = new Image();
    image.decoding = "async";
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Không tải được ảnh mẫu: ${src}`));
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

    // Gợi ý mờ tại vùng QR để người dùng biết vùng này sẽ có QR sau khi tạo
    drawPlaceholder(context, template.qr);
  } catch (error) {
    setMessage(elements.statusMessage, error.message, "error");
  } finally {
    setLoading(false);
  }
}

function drawPlaceholder(context, qr) {
  context.save();
  context.setLineDash([10, 8]);
  context.strokeStyle = "rgba(88, 108, 153, 0.55)";
  context.lineWidth = 3;
  context.strokeRect(qr.x + 10, qr.y + 10, qr.w - 20, qr.h - 20);

  context.setLineDash([]);
  context.fillStyle = "rgba(96, 111, 138, 0.20)";
  context.font = `700 ${Math.max(16, Math.floor(Math.min(qr.w, qr.h) * 0.09))}px Arial, Helvetica, sans-serif`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText("QR sẽ hiện ở đây", qr.x + qr.w / 2, qr.y + qr.h / 2);
  context.restore();
}

function roundedRectPath(context, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  context.beginPath();
  context.moveTo(x + r, y);
  context.lineTo(x + width - r, y);
  context.quadraticCurveTo(x + width, y, x + width, y + r);
  context.lineTo(x + width, y + height - r);
  context.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
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

  roundedRectPath(context, -size * 0.47, -size * 0.17, size * 0.58, size * 0.34, size * 0.16);
  context.stroke();
  roundedRectPath(context, -size * 0.11, -size * 0.17, size * 0.58, size * 0.34, size * 0.16);
  context.stroke();
  context.beginPath();
  context.moveTo(-size * 0.12, 0);
  context.lineTo(size * 0.12, 0);
  context.stroke();
  context.restore();
}

function ellipsizeText(context, text, maxWidth) {
  if (context.measureText(text).width <= maxWidth) return text;
  let result = text;
  while (result.length > 4 && context.measureText(`${result}…`).width > maxWidth) {
    result = result.slice(0, -1);
  }
  return `${result}…`;
}

function drawLinkPill(context, pill, url) {
  if (!pill) return;

  const radius = pill.h / 2;
  const gradient = context.createLinearGradient(pill.x, pill.y, pill.x + pill.w, pill.y);
  gradient.addColorStop(0, pill.colorStart);
  gradient.addColorStop(1, pill.colorEnd);

  context.save();
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
  while (fontSize > minFontSize && context.measureText(url).width > maxTextWidth) {
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
    color: { dark: "#000000", light: "#ffffff" }
  });

  context.fillStyle = "#ffffff";
  context.fillRect(template.qr.x, template.qr.y, template.qr.w, template.qr.h);

  context.imageSmoothingEnabled = false;
  context.drawImage(qrCanvas, template.qr.x, template.qr.y, template.qr.w, template.qr.h);
  context.imageSmoothingEnabled = true;

  if (elements.replaceTextCheckbox.checked && template.pill) {
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
      if (blob) resolve(blob);
      else reject(new Error("Không thể xuất ảnh PNG."));
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
      setMessage(elements.urlMessage, "Link hợp lệ. Công cụ vẫn tạo QR dù đây không phải link Shopee.", "warning");
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
    setMessage(elements.statusMessage, `Đã tạo xong ${template.name}. Bạn có thể tải ảnh PNG.`, "success");
  } catch (error) {
    console.error(error);
    state.lastGeneratedBlob = null;
    state.lastGeneratedFilename = null;
    elements.downloadButton.disabled = true;
    setMessage(elements.statusMessage, error?.message || "Có lỗi xảy ra khi tạo ảnh.", "error");
  } finally {
    setLoading(false);
  }
}

function downloadGeneratedImage() {
  if (!state.lastGeneratedBlob || !state.lastGeneratedFilename) {
    setMessage(elements.statusMessage, "Bạn cần tạo ảnh trước khi tải xuống.", "warning");
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
    if (!navigator.clipboard?.readText) throw new Error("Clipboard không hỗ trợ.");
    const text = await navigator.clipboard.readText();
    elements.urlInput.value = text.trim();
    elements.urlInput.focus();
    setMessage(elements.urlMessage, "Đã dán nội dung từ clipboard.", "success");
  } catch {
    setMessage(elements.urlMessage, "Không thể dán tự động. Hãy nhấn Ctrl + V vào ô link.", "warning");
    elements.urlInput.focus();
  }
}

elements.generateButton.addEventListener("click", generateImage);
elements.downloadButton.addEventListener("click", downloadGeneratedImage);
elements.pasteButton.addEventListener("click", pasteFromClipboard);

elements.urlInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") generateImage();
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
  setMessage(elements.statusMessage, "Tùy chọn đã thay đổi. Hãy bấm “Tạo ảnh ngay” để cập nhật.", "warning");
});

async function initialize() {
  createTemplateCards();
  updatePreviewHeader();
  await showBaseTemplate(getSelectedTemplate());
}

initialize();
