document.addEventListener("DOMContentLoaded", () => {
  const logoUpload = document.getElementById("logoUpload");
  const logo = document.getElementById("logo");
  const company = document.getElementById("company");
  const address = document.getElementById("address");
  const phone = document.getElementById("phone");
  const email = document.getElementById("email");
  const website = document.getElementById("website");
  const companyName = document.getElementById("companyName");
  const companyDetails = document.getElementById("companyDetails");
  const invoiceNumber = document.getElementById("invoiceNumber");
  const addItemBtn = document.getElementById("addItem");
  const table = document.getElementById("items");
  const grandTotal = document.getElementById("grandTotal");
  const colorBtns = document.querySelectorAll(".color-btn");
  const invoice = document.getElementById("invoice");

  let color = "red";
  let invoiceCounter = Math.floor(Math.random() * 10000);
  invoiceNumber.textContent = "INV-" + invoiceCounter;

  logoUpload.addEventListener("change", e => {
    const file = e.target.files[0];
    if (file) {
      logo.src = URL.createObjectURL(file);
    }
  });

  function updateDetails() {
    companyName.textContent = company.value || "Company Name";
    companyDetails.innerHTML = \`\${address.value}<br>\${phone.value} | \${email.value} | \${website.value}\`;
  }
  [company, address, phone, email, website].forEach(input => input.addEventListener("input", updateDetails));

  addItemBtn.addEventListener("click", () => {
    const row = table.insertRow(-1);
    row.innerHTML = '<td><input placeholder="Item name"></td><td><input type="number" placeholder="1"></td><td><input type="number" placeholder="0"></td><td class="total">0</td>';
  });

  colorBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      color = btn.dataset.color;
      invoice.style.border = "3px solid " + color;
      companyName.style.color = color;
    });
  });

  document.getElementById("generateImage").addEventListener("click", async () => {
    const canvas = await html2canvas(invoice);
    const imgData = canvas.toDataURL("image/png");
    const newTab = window.open();
    newTab.document.body.innerHTML = '<img src="' + imgData + '" style="width:100%">';
  });

  document.getElementById("downloadImage").addEventListener("click", async () => {
    const canvas = await html2canvas(invoice);
    const link = document.createElement("a");
    link.download = "invoice.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });

  document.getElementById("shareImage").addEventListener("click", async () => {
    const canvas = await html2canvas(invoice);
    canvas.toBlob(blob => {
      const file = new File([blob], "invoice.png", {type: "image/png"});
      if (navigator.share) {
        navigator.share({title: "Invoice", files: [file]}).catch(console.error);
      } else {
        alert("Sharing not supported on this device. Please download instead.");
      }
    });
  });
});
