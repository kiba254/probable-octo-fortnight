document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }
  document.querySelectorAll(".year").forEach(el => el.textContent = new Date().getFullYear());

  const form = document.getElementById("enquiryForm");
  const whatsappButton = document.getElementById("sendWhatsApp");
  const note = document.getElementById("formNote");
  if (!form) return;

  function collectMessage() {
    if (!form.reportValidity()) return null;
    const data = new FormData(form);
    const fields = [
      ["Name", data.get("name")],
      ["Email", data.get("email")],
      ["Phone / WhatsApp", data.get("phone") || "Not provided"],
      ["Country", data.get("country")],
      ["Enquiry category", data.get("service")],
      ["Subject", data.get("subject")],
      ["Preferred response", data.get("reply")],
      ["Message / problem description", data.get("message")]
    ];
    return "Hello Kelvin, I would like to make an enquiry.\\n\\n" +
      fields.map(([label, value]) => label + ":\\n" + value).join("\\n\\n");
  }

  form.addEventListener("submit", event => {
    event.preventDefault();
    const message = collectMessage();
    if (!message) return;
    const subject = form.elements.subject.value.trim() || "Website enquiry";
    const url = "mailto:kibakelvin988@gmail.com?subject=" +
      encodeURIComponent("Website enquiry: " + subject) +
      "&body=" + encodeURIComponent(message);
    if (note) note.textContent = "Opening your email app with the enquiry filled in. Please review and press Send.";
    window.location.href = url;
  });

  if (whatsappButton) {
    whatsappButton.addEventListener("click", () => {
      const message = collectMessage();
      if (!message) return;
      if (note) note.textContent = "Opening WhatsApp with your enquiry. Please review and press Send.";
      window.open("https://wa.me/254796293126?text=" + encodeURIComponent(message), "_blank", "noopener");
    });
  }
});
