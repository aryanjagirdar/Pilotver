function formatCurrency(num) {
    return "$" + Number(num).toFixed(2);
}

function removeItem(btn) {
    btn.parentElement.remove();
    calculateTotals();
    calculateIncome();
    calculateWork();
}

// Placeholder functions (you can expand later)
function addBankAccount() {
    let container = document.getElementById("bank-items");
    container.innerHTML += `<div class="item">
        <input type="text" placeholder="Account Name">
        <input type="number" placeholder="0.00" step="0.01" oninput="calculateTotals()">
        <button class="btn remove-btn" onclick="removeItem(this)">×</button>
    </div>`;
}

function addInvestment() {
    let container = document.getElementById("investment-items");
    container.innerHTML += `<div class="item">
        <input type="text" placeholder="Investment Name">
        <input type="number" placeholder="0.00" step="0.01" oninput="calculateTotals()">
        <button class="btn remove-btn" onclick="removeItem(this)">×</button>
    </div>`;
}

function addCrypto() {
    let container = document.getElementById("crypto-items");
    container.innerHTML += `<div class="item">
        <input type="text" placeholder="Crypto Name">
        <input type="number" placeholder="Amount">
        <input type="number" placeholder="0.00" step="0.01" oninput="calculateTotals()">
        <button class="btn remove-btn" onclick="removeItem(this)">×</button>
    </div>`;
}

function addAltcoin() {
    let container = document.getElementById("altcoin-items");
    container.innerHTML += `<div class="item">
        <input type="text" placeholder="Altcoin">
        <input type="number" placeholder="Amount">
        <input type="number" placeholder="0.00" step="0.01" oninput="calculateTotals()">
        <button class="btn remove-btn" onclick="removeItem(this)">×</button>
    </div>`;
}

function addRent() {
    let container = document.getElementById("rent-items");
    container.innerHTML += `<div class="item">
        <input type="text" placeholder="Property Name">
        <input type="number" placeholder="0.00" step="0.01" oninput="calculateTotals()">
        <button class="btn remove-btn" onclick="removeItem(this)">×</button>
    </div>`;
}

function addDebt() {
    let container = document.getElementById("debt-items");
    container.innerHTML += `<div class="item">
        <input type="text" placeholder="Debt Type">
        <input type="number" placeholder="0.00" step="0.01" oninput="calculateTotals()">
        <button class="btn remove-btn" onclick="removeItem(this)">×</button>
    </div>`;
}

function addEmployment() {
    let container = document.getElementById("employment-items");
    container.innerHTML += `<div class="item">
        <input type="text" placeholder="Job/Company">
        <select>
            <option value="monthly">Monthly</option>
            <option value="weekly">Weekly</option>
            <option value="yearly">Yearly</option>
        </select>
        <input type="number" placeholder="0.00" step="0.01" oninput="calculateIncome()">
        <button class="btn remove-btn" onclick="removeItem(this)">×</button>
    </div>`;
}

function addOtherIncome() {
    let container = document.getElementById("other-income-items");
    container.innerHTML += `<div class="item">
        <input type="text" placeholder="Other Source">
        <input type="number" placeholder="0.00" step="0.01" oninput="calculateIncome()">
        <button class="btn remove-btn" onclick="removeItem(this)">×</button>
    </div>`;
}

function addWorkItem() {
    let container = document.getElementById("work-items");
    container.innerHTML += `<div class="item work-item">
        <input type="text" placeholder="Job Title">
        <input type="number" placeholder="Hours/Week" step="0.5" oninput="calculateWork()">
        <input type="number" placeholder="$/Hour" step="0.01" oninput="calculateWork()">
        <input type="number" placeholder="Tax %" step="0.1" oninput="calculateWork()">
        <input type="number" placeholder="Net Weekly" readonly>
        <button class="btn remove-btn" onclick="removeItem(this)">×</button>
    </div>`;
}

function calculateTotals() {
    let totalAssets = 0, totalLiabilities = 0;
    document.querySelectorAll("#bank-items input[type=number], #investment-items input[type=number], #crypto-items input[type=number]:last-child, #altcoin-items input[type=number]:last-child").forEach(el => {
        totalAssets += parseFloat(el.value) || 0;
    });
    document.querySelectorAll("#rent-items input[type=number], #debt-items input[type=number]").forEach(el => {
        totalLiabilities += parseFloat(el.value) || 0;
    });
    document.getElementById("total-assets").innerText = formatCurrency(totalAssets);
    document.getElementById("total-liabilities").innerText = formatCurrency(totalLiabilities);
    document.getElementById("summary-assets").innerText = formatCurrency(totalAssets);
    document.getElementById("summary-liabilities").innerText = formatCurrency(totalLiabilities);
    document.getElementById("summary-net-worth").innerText = formatCurrency(totalAssets - totalLiabilities);
}

function calculateIncome() {
    let totalIncome = 0;
    document.querySelectorAll("#employment-items input[type=number], #other-income-items input[type=number]").forEach(el => {
        totalIncome += parseFloat(el.value) || 0;
    });
    document.getElementById("total-income").innerText = formatCurrency(totalIncome);
    document.getElementById("summary-income").innerText = formatCurrency(totalIncome);
}

function calculateWork() {
    let totalHours = 0, totalWage = 0, totalTax = 0, jobs = 0;
    document.querySelectorAll("#work-items .work-item").forEach(item => {
        let hours = parseFloat(item.children[1].value) || 0;
        let rate = parseFloat(item.children[2].value) || 0;
        let tax = parseFloat(item.children[3].value) || 0;
        let gross = hours * rate;
        let net = gross * (1 - tax / 100);
        item.children[4].value = net.toFixed(2);
        totalHours += hours;
        totalWage += rate;
        totalTax += gross - net;
        jobs++;
    });
    document.getElementById("total-hours").innerText = totalHours;
    document.getElementById("avg-wage").innerText = formatCurrency(jobs ? totalWage / jobs : 0);
    document.getElementById("weekly-gross").innerText = formatCurrency(totalHours * (jobs ? totalWage / jobs : 0));
    document.getElementById("tax-rate").innerText = jobs ? (totalTax / (totalHours * (totalWage / jobs)) * 100).toFixed(1) + "%" : "0%";
    document.getElementById("weekly-tax").innerText = formatCurrency(totalTax);
    document.getElementById("monthly-tax").innerText = formatCurrency(totalTax * 4);
    document.getElementById("yearly-tax").innerText = formatCurrency(totalTax * 52);
    document.getElementById("take-home").innerText = formatCurrency(totalHours * (jobs ? totalWage / jobs : 0) - totalTax);
}

// Tabs
function showTab(index) {
    document.querySelectorAll(".tab").forEach((tab, i) => tab.classList.toggle("active", i === index));
    document.querySelectorAll(".tab-content").forEach((content, i) => content.style.display = i === index ? "block" : "none");
}

// Default tab
showTab(0);

// Export to Excel
function exportToExcel() {
    let wb = XLSX.utils.book_new();
    wb.SheetNames.push("Dashboard");
    let ws_data = [["Summary", "Value"],
        ["Total Assets", document.getElementById("summary-assets").innerText],
        ["Total Liabilities", document.getElementById("summary-liabilities").innerText],
        ["Net Worth", document.getElementById("summary-net-worth").innerText],
        ["Monthly Income", document.getElementById("summary-income").innerText]];
    let ws = XLSX.utils.aoa_to_sheet(ws_data);
    wb.Sheets["Dashboard"] = ws;
    XLSX.writeFile(wb, "FinancialDashboard.xlsx");
}
