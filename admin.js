const API_URL = "https://plain-sky-f718.gagtgvgqgg.workers.dev/reports"; // 🔴 ใส่ URL จริง

const list = document.getElementById("reportList");
const loading = document.getElementById("loading");

fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    loading.remove();

    if (!Array.isArray(data) || data.length === 0) {
      list.innerHTML = `
        <div class="card">
          ยังไม่มีรายงานที่ส่งเข้ามา
        </div>
      `;
      return;
    }

    data.forEach(item => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <h3>${item.title || "ไม่ระบุหัวข้อ"}</h3>
        <p>${item.detail || "-"}</p>
        <small>
          ผู้แจ้ง: ${item.sender || "ไม่ระบุ"}<br>
          เวลา: ${item.time || "-"}
        </small>
      `;

      list.appendChild(card);
    });
  })
  .catch(err => {
    loading.innerHTML = "ไม่สามารถโหลดข้อมูลได้";
    console.error(err);
  });