let currentTab = 0;

// Set current date when page loads
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('currentDate').textContent = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Initialize calculations
    calculateTotals();
    calculateIncome();
    calculateWork();
    
    // Initialize tab slider
    initializeTabSlider();
});

function initializeTabSlider() {
    const tabs = document.querySelectorAll('.tab');
    const tabSlider = document.getElementById('tabSlider');
    
    if (tabs.length > 0 && tabSlider) {
        const tabWidth = tabs[0].offsetWidth;
        tabSlider.style.width = `${tabWidth}px`;
    }
}

function showTab(index) {
    currentTab = index;
    const slider = document.getElementById('contentSlider');
    const tabSlider = document.getElementById('tabSlider');
    const tabs = document.querySelectorAll('.tab');
    
    // Move content
    slider.style.transform = `translateX(-${index * 33.333}%)`;
    
    // Move tab slider (only on desktop)
    if (window.innerWidth > 768) {
        const tabWidth = tabs[0].offsetWidth;
        tabSlider.style.width = `${tabWidth}px`;
        tabSlider.style.transform = `translateX(${index * tabWidth}px)`;
    }
    
    // Update active tab
    tabs.forEach((tab, i) => {
        tab.classList.toggle('active', i === index);
    });
}

// Touch/swipe functionality
let startX = 0;
let startY = 0;
let isDragging = false;

document.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    isDragging = true;
});

document.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    
    const deltaX = e.touches[0].clientX - startX;
    const deltaY = e.touches[0].clientY - startY;
    
    // Prevent default if horizontal swipe
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        e.preventDefault();
    }
});

document.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    isDragging = false;
    
    const endX = e.changedTouches[0].clientX;
    const deltaX = endX - startX;
    
    if (Math.abs(deltaX) > 50) { // Minimum swipe distance
        if (deltaX > 0 && currentTab > 0) {
            showTab(currentTab - 1);
        } else if (deltaX < 0 && currentTab < 2) {
            showTab(currentTab + 1);
        }
    }
});

// Window resize handler
window.addEventListener('resize', () => {
    initializeTabSlider();
});

// Add new item functions
function addBankAccount() {
    const container = document.getElementById('bank-items');
    const newItem = document.createElement('div');
    newItem.className = 'item';
    newItem.innerHTML = `
        <select>
            <option>Chase Bank</option>
            <option>Bank of America</option>
            <option>Wells Fargo</option>
            <option>Citibank</option>
            <option>TD Bank</option>
            <option>Capital One</option>
            <option>US Bank</option>
            <option>PNC Bank</option>
            <option>Other</option>
        </select>
        <input type="text" placeholder="Account Name">
        <input type="number" placeholder="0.00" step="0.01" oninput="calculateTotals()">
        <button class="btn remove-btn" onclick="removeItem(this)">×</button>
    `;
    container.appendChild(newItem);
}

function addInvestment() {
    const container = document.getElementById('investment-items');
    const newItem = document.createElement('div');
    newItem.className = 'item';
    newItem.innerHTML = `
        <input type="text" placeholder="Investment Name">
        <input type="text" placeholder="Platform/Broker">
        <input type="number" placeholder="0.00" step="0.01" oninput="calculateTotals()">
        <button class="btn remove-btn" onclick="removeItem(this)">×</button>
    `;
    container.appendChild(newItem);
}

function addCrypto() {
    const container = document.getElementById('crypto-items');
    const newItem = document.createElement('div');
    newItem.className = 'item';
    newItem.innerHTML = `
        <select>
            <option value="bitcoin">Bitcoin (BTC)</option>
            <option value="ethereum">Ethereum (ETH)</option>
            <option value="binancecoin">Binance Coin (BNB)</option>
            <option value="cardano">Cardano (ADA)</option>
            <option value="solana">Solana (SOL)</option>
            <option value="xrp">XRP (XRP)</option>
            <option value="polkadot">Polkadot (DOT)</option>
            <option value="dogecoin">Dogecoin (DOGE)</option>
            <option value="shiba-inu">Shiba Inu (SHIB)</option>
            <option value="avalanche">Avalanche (AVAX)</option>
        </select>
        <input type="number" placeholder="Amount" step="0.00001">
        <input type="number" placeholder="0.00" step="0.01" oninput="calculateTotals()">
        <button class="btn remove-btn" onclick="removeItem(this)">×</button>
    `;
    container.appendChild(newItem);
}

function addAltcoin() {
    const container = document.getElementById('altcoin-items');
    const newItem = document.createElement('div');
    newItem.className = 'item';
    newItem.innerHTML = `
        <select>
            <option value="chainlink">Chainlink (LINK)</option>
            <option value="uniswap">Uniswap (UNI)</option>
            <option value="litecoin">Litecoin (LTC)</option>
            <option value="polygon">Polygon (MATIC)</option>
            <option value="cosmos">Cosmos (ATOM)</option>
            <option value="algorand">Algorand (ALGO)</option>
            <option value="tezos">Tezos (XTZ)</option>
            <option value="stellar">Stellar (XLM)</option>
            <option value="vechain">VeChain (VET)</option>
            <option value="custom">Custom/Other</option>
        </select>
        <input type="number" placeholder="Amount" step="0.00001">
        <input type="number" placeholder="0.00" step="0.01" oninput="calculateTotals()">
        <button class="btn remove-btn" onclick="removeItem(this)">×</button>
    `;
    container.appendChild(newItem);
}

function addRent() {
    const container = document.getElementById('rent-items');
    const newItem = document.createElement('div');
    newItem.className = 'item';
    newItem.innerHTML = `
        <input type="text" placeholder="Property Name">
        <input type="text" placeholder="Landlord/Company">
        <input type="number" placeholder="0.00" step="0.01" oninput="calculateTotals()">
        <button class="btn remove-btn" onclick="removeItem(this)">×</button>
    `;
    container.appendChild(newItem);
}

function addDebt() {
    const container = document.getElementById('debt-items');
    const newItem = document.createElement('div');
    newItem.className = 'item';
    newItem.innerHTML = `
        <select>
            <option>Credit Card</option>
            <option>Student Loan</option>
            <option>Personal Loan</option>
            <option>Auto Loan</option>
            <option>Medical Debt</option>
            <option>Other</option>
        </select>
        <input type="text" placeholder="Account Name">
        <input type="number" placeholder="0.00" step="0.01" oninput="calculateTotals()">
        <button class="btn remove-btn" onclick="removeItem(this)">×</button>
    `;
    container.appendChild(newItem);
}

function addEmployment() {
    const container = document.getElementById('employment-items');
    const newItem = document.createElement('div');
    newItem.className = 'item';
    newItem.innerHTML = `
        <input type="text" placeholder="Job/Company">
        <select>
            <option value="monthly">Monthly</option>
            <option value="weekly">Weekly</option>
            <option value="biweekly">Bi-weekly</option>
            <option value="yearly">Yearly</option>
        </select>
        <input type="number" placeholder="0.00" step="0.01" oninput="calculateIncome()">
        <button class="btn remove-btn" onclick="removeItem(this)">×</button>
    `;
    container.appendChild(newItem);
}

function addOtherIncome() {
    const container = document.getElementById('other-income-items');
    const newItem = document.createElement('div');
    newItem.className = 'item';
    newItem.innerHTML = `
        <input type="text" placeholder="Income Source">
        <select>
            <option value="monthly">Monthly</option>
            <option value="weekly">Weekly</option>
            <option value="yearly">Yearly</option>
            <option value="quarterly">Quarterly</option>
        </select>
        <input type="number" placeholder="0.00" step="0.01" oninput="calculateIncome()">
        <button class="btn remove-btn" onclick="removeItem(this)">×</button>
    `;
    container.appendChild(newItem);
}

function addWorkItem() {
    const container = document.getElementById('work-items');
    const newItem = document.createElement('div');
    newItem.className = 'item work-item';
    newItem.innerHTML = `
        <input type="text" placeholder="Job Title">
        <input type="number" placeholder="Hours/Week" step="0.5" class="small-input" oninput="calculateWork()">
        <input type="number" placeholder="$/Hour" step="0.01" class="small-input" oninput="calculateWork()">
        <input type="number" placeholder="Tax %" step="0.1" class="small-input" oninput="calculateWork()">
        <input type="number" placeholder="Net Weekly" step="0.01" class="small-input" readonly>
        <button class="btn remove-btn" onclick="removeItem(this)">×</button>
    `;
    container.appendChild(newItem);
}

function removeItem(button) {
    button.parentElement.remove();
    calculateTotals();
    calculateIncome();
    calculateWork();
}

function calculateTotals() {
    // Calculate total assets
    const assetInputs = document.querySelectorAll('.assets input[type="number"]');
    let totalAssets = 0;
    assetInputs.forEach(input => {
        const value = parseFloat(input.value) || 0;
        totalAssets += value;
    });

    // Calculate total liabilities
    const liabilityInputs = document.querySelectorAll('.liabilities input[type="number"]');
    let totalLiabilities = 0;
    liabilityInputs.forEach(input => {
        const value = parseFloat(input.value) || 0;
        totalLiabilities += value;
    });

    // Calculate net worth
    const netWorth = totalAssets - totalLiabilities;

    // Update display
    updateElementText('total-assets', formatCurrency(totalAssets));
    updateElementText('total-liabilities', formatCurrency(totalLiabilities));
    updateElementText('summary-assets', formatCurrency(totalAssets));
    updateElementText('summary-liabilities', formatCurrency(totalLiabilities));
    updateElementText('summary-net-worth', formatCurrency(netWorth));
    
    // Color code net worth
    const netWorthElement = document.getElementById('summary-net-worth');
    if (netWorthElement) {
        netWorthElement.style.color = netWorth >= 0 ? '#10b981' : '#ef4444';
    }
}

function calculateIncome() {
    let totalMonthlyIncome = 0;
    
    // Calculate employment income
    const employmentItems = document.querySelectorAll('#employment-items .item');
    employmentItems.forEach(item => {
        const frequency = item.querySelector('select').value;
        const amountInput = item.querySelector('input[type="number"]');
        const amount = parseFloat(amountInput.value) || 0;
        
        let monthlyAmount = 0;
        switch(frequency) {
            case 'weekly':
                monthlyAmount = amount * 4.33;
                break;
            case 'biweekly':
                monthlyAmount = amount * 2.17;
                break;
            case 'monthly':
                monthlyAmount = amount;
                break;
            case 'yearly':
                monthlyAmount = amount / 12;
                break;
        }
        totalMonthlyIncome += monthlyAmount;
    });
    
    // Calculate other income
    const otherIncomeItems = document.querySelectorAll('#other-income-items .item');
    otherIncomeItems.forEach(item => {
        const frequency = item.querySelector('select').value;
        const amountInput = item.querySelector('input[type="number"]');
        const amount = parseFloat(amountInput.value) || 0;
        
        let monthlyAmount = 0;
        switch(frequency) {
            case 'weekly':
                monthlyAmount = amount * 4.33;
                break;
            case 'monthly':
                monthlyAmount = amount;
                break;
            case 'quarterly':
                monthlyAmount = amount / 3;
                break;
            case 'yearly':
                monthlyAmount = amount / 12;
                break;
        }
        totalMonthlyIncome += monthlyAmount;
    });
    
    updateElementText('total-income', formatCurrency(totalMonthlyIncome));
    updateElementText('summary-income', formatCurrency(totalMonthlyIncome));
}

function calculateWork() {
    let totalHours = 0;
    let totalWeeklyGross = 0;
    let totalWeeklyTax = 0;
    let totalWages = 0;
    let jobCount = 0;
    
    const workItems = document.querySelectorAll('#work-items .item');
    workItems.forEach(item => {
        const inputs = item.querySelectorAll('input[type="number"]');
        if (inputs.length >= 5) {
            const hours = parseFloat(inputs[0].value) || 0;
            const hourlyWage = parseFloat(inputs[1].value) || 0;
            const taxRate = parseFloat(inputs[2].value) || 0;
            
            if (hours > 0 && hourlyWage > 0) {
                const weeklyGross = hours * hourlyWage;
                const weeklyTax = weeklyGross * (taxRate / 100);
                const weeklyNet = weeklyGross - weeklyTax;
                
                // Update net pay field
                inputs[3].value = weeklyNet.toFixed(2);
                
                totalHours += hours;
                totalWeeklyGross += weeklyGross;
                totalWeeklyTax += weeklyTax;
                totalWages += hourlyWage;
                jobCount++;
            }
        }
    });
    
    const avgWage = jobCount > 0 ? totalWages / jobCount : 0;
    const avgTaxRate = totalWeeklyGross > 0 ? (totalWeeklyTax / totalWeeklyGross) * 100 : 0;
    const weeklyTakeHome = totalWeeklyGross - totalWeeklyTax;
    
    // Update work stats
    updateElementText('total-hours', totalHours.toFixed(1));
    updateElementText('avg-wage', formatCurrency(avgWage));
    updateElementText('weekly-gross', formatCurrency(totalWeeklyGross));
    updateElementText('tax-rate', avgTaxRate.toFixed(1) + '%');
    
    // Update tax summary
    updateElementText('weekly-tax', formatCurrency(totalWeeklyTax));
    updateElementText('monthly-tax', formatCurrency(totalWeeklyTax * 4.33));
    updateElementText('yearly-tax', formatCurrency(totalWeeklyTax * 52));
    updateElementText('take-home', formatCurrency(weeklyTakeHome));
}

function updateElementText(id, text) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = text;
    }
}

function formatCurrency(amount) {
    return '$' + amount.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function exportToExcel() {
    try {
        // Check if XLSX library is loaded
        if (typeof XLSX === 'undefined') {
            alert('Excel export library not loaded. Please check your internet connection and try again.');
            return;
        }

        // Collect all data
        const data = [];
        
        // Header
        data.push(['Personal Financial Dashboard', '', '']);
        data.push(['Generated on: ' + new Date().toLocaleDateString(), '', '']);
        data.push(['', '', '']);
        
        // Assets data
        data.push(['ASSETS', '', '']);
        data.push(['Category', 'Item', 'Amount']);
        
        // Bank accounts
        const bankItems = document.querySelectorAll('#bank-items .item');
        bankItems.forEach(item => {
            const inputs = item.querySelectorAll('input, select');
            if (inputs.length >= 3) {
                const bankName = inputs[0].value || 'Unknown Bank';
                const accountName = inputs[1].value || 'Account';
                const amount = inputs[2].value || '0';
                data.push(['Bank Account', `${bankName} - ${accountName}`, amount]);
            }
        });
        
        // Investments
        const investmentItems = document.querySelectorAll('#investment-items .item');
        investmentItems.forEach(item => {
            const inputs = item.querySelectorAll('input');
            if (inputs.length >= 3) {
                const investmentName = inputs[0].value || 'Investment';
                const platform = inputs[1].value || 'Platform';
                const amount = inputs[2].value || '0';
                data.push(['Investment', `${investmentName} - ${platform}`, amount]);
            }
        });
        
        // Popular Crypto
        const cryptoItems = document.querySelectorAll('#crypto-items .item');
        cryptoItems.forEach(item => {
            const select = item.querySelector('select');
            const inputs = item.querySelectorAll('input');
            if (select && inputs.length >= 2) {
                const cryptoName = select.options[select.selectedIndex].text || 'Crypto';
                const amount = inputs[0].value || '0';
                const value = inputs[1].value || '0';
                data.push(['Popular Crypto', `${cryptoName} - ${amount} coins`, value]);
            }
        });
        
        // Altcoins
        const altcoinItems = document.querySelectorAll('#altcoin-items .item');
        altcoinItems.forEach(item => {
            const select = item.querySelector('select');
            const inputs = item.querySelectorAll('input');
            if (select && inputs.length >= 2) {
                const altcoinName = select.options[select.selectedIndex].text || 'Altcoin';
                const amount = inputs[0].value || '0';
                const value = inputs[1].value || '0';
                data.push(['Altcoin', `${altcoinName} - ${amount} coins`, value]);
            }
        });
        
        data.push(['', '', '']);
        
        // Liabilities
        data.push(['LIABILITIES', '', '']);
        data.push(['Category', 'Item', 'Amount']);
        
        // Rent
        const rentItems = document.querySelectorAll('#rent-items .item');
        rentItems.forEach(item => {
            const inputs = item.querySelectorAll('input');
            if (inputs.length >= 3) {
                const propertyName = inputs[0].value || 'Property';
                const landlord = inputs[1].value || 'Landlord';
                const amount = inputs[2].value || '0';
                data.push(['Monthly Rent', `${propertyName} - ${landlord}`, amount]);
            }
        });
        
        // Debts
        const debtItems = document.querySelectorAll('#debt-items .item');
        debtItems.forEach(item => {
            const select = item.querySelector('select');
            const inputs = item.querySelectorAll('input');
            if (select && inputs.length >= 2) {
                const debtType = select.value || 'Debt';
                const accountName = inputs[0].value || 'Account';
                const amount = inputs[1].value || '0';
                data.push(['Debt', `${debtType} - ${accountName}`, amount]);
            }
        });
        
        data.push(['', '', '']);
        
        // Income
        data.push(['INCOME', '', '']);
        data.push(['Category', 'Source', 'Amount']);
        
        // Employment Income
        const employmentItems = document.querySelectorAll('#employment-items .item');
        employmentItems.forEach(item => {
            const inputs = item.querySelectorAll('input');
            const select = item.querySelector('select');
            if (inputs.length >= 2 && select) {
                const jobName = inputs[0].value || 'Job';
                const frequency = select.value || 'monthly';
                const amount = inputs[1].value || '0';
                data.push(['Employment', `${jobName} (${frequency})`, amount]);
            }
        });
        
        // Other Income
        const otherIncomeItems = document.querySelectorAll('#other-income-items .item');
        otherIncomeItems.forEach(item => {
            const inputs = item.querySelectorAll('input');
            const select = item.querySelector('select');
            if (inputs.length >= 2 && select) {
                const sourceName = inputs[0].value || 'Income Source';
                const frequency = select.value || 'monthly';
                const amount = inputs[1].value || '0';
                data.push(['Other Income', `${sourceName} (${frequency})`, amount]);
            }
        });
        
        data.push(['', '', '']);
        
        // Work & Hours
        data.push(['WORK & HOURS', '', '', '', '']);
        data.push(['Job Title', 'Hours/Week', '$/Hour', 'Tax %', 'Net Weekly']);
        
        const workItems = document.querySelectorAll('#work-items .item');
        workItems.forEach(item => {
            const inputs = item.querySelectorAll('input');
            if (inputs.length >= 5) {
                const jobTitle = inputs[0].value || 'Job';
                const hours = inputs[1].value || '0';
                const wage = inputs[2].value || '0';
                const taxRate = inputs[3].value || '0';
                const netWeekly = inputs[4].value || '0';
                data.push([jobTitle, hours, wage, taxRate + '%', netWeekly]);
            }
        });
        
        // Summary
        data.push(['', '', '']);
        data.push(['SUMMARY', '', '']);
        data.push(['Total Assets', '', document.getElementById('summary-assets')?.textContent || '$0.00']);
        data.push(['Total Liabilities', '', document.getElementById('summary-liabilities')?.textContent || '$0.00']);
        data.push(['Net Worth', '', document.getElementById('summary-net-worth')?.textContent || '$0.00']);
        data.push(['Monthly Income', '', document.getElementById('summary-income')?.textContent || '$0.00']);

        // Create worksheet
        const ws = XLSX.utils.aoa_to_sheet(data);
        
        // Set column widths
        const colWidths = [
            { wch: 20 }, // Category
            { wch: 30 }, // Item
            { wch: 15 }  // Amount
        ];
        ws['!cols'] = colWidths;
        
        // Create workbook
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Financial Dashboard");
        
        // Generate filename with current date
        const today = new Date().toISOString().split('T')[0];
        const filename = `financial-dashboard-${today}.xlsx`;
        
        // Save file
        XLSX.writeFile(wb, filename);
        
        // Show success message
        setTimeout(() => {
            alert('Excel file exported successfully! Check your downloads folder.');
        }, 100);
        
    } catch (error) {
        console.error('Export error:', error);
        alert('Error exporting to Excel. Please check your internet connection and try again.');
    }
}