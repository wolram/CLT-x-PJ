// CLT x PJ — Comparison Page Logic
// Handles form input, calculation, results rendering, and localStorage persistence.

(function () {
    'use strict';

    // ============================================================
    // UTILS
    // ============================================================

    function formatMoney(value) {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    function parseCurrency(value) {
        if (!value) return 0;
        return Number(String(value).replace(/\D/g, '')) / 100;
    }

    function formatCurrencyInput(value) {
        return formatMoney(parseCurrency(value));
    }

    // ============================================================
    // INPUT MASKING
    // ============================================================

    function setupInputMask(id) {
        var el = document.getElementById(id);
        if (!el) return;

        if (el.value && !el.value.includes('R$')) {
            el.value = formatMoney(parseFloat(el.value) || 0);
        }

        el.addEventListener('input', function (e) {
            e.target.value = formatCurrencyInput(e.target.value);
            autoSave();
        });
    }

    // ============================================================
    // TOGGLE SECTIONS
    // ============================================================

    window.toggleSection = function (id) {
        var content = document.getElementById(id);
        var header = content.previousElementSibling;
        content.classList.toggle('open');
        header.classList.toggle('open');
    };

    // ============================================================
    // REGIME CHANGE HANDLER
    // ============================================================

    window.onRegimeChange = function () {
        var regime = document.getElementById('pj-regime').value;
        var anexoGroup = document.getElementById('pj-anexo-group');
        anexoGroup.style.display = regime === 'simples' ? '' : 'none';
        autoSave();
    };

    // ============================================================
    // STEP NAVIGATION
    // ============================================================

    var currentStep = 1;

    window.goToStep = function (step) {
        if (step === 2) {
            var cltSalary = parseCurrency(document.getElementById('clt-salary').value);
            if (!cltSalary) {
                document.getElementById('clt-salary').focus();
                return;
            }
            if (window.CLTxPJAnalytics) {
                window.CLTxPJAnalytics.funnel.simulation('comparison', cltSalary, 0);
            }
        }

        if (step === 3) {
            var pjRevenue = parseCurrency(document.getElementById('pj-revenue').value);
            if (!pjRevenue) {
                document.getElementById('pj-revenue').focus();
                return;
            }
            calculateAndShowResults();
        }

        currentStep = step;

        document.getElementById('step-clt').classList.toggle('hidden', step !== 1);
        document.getElementById('step-pj').classList.toggle('hidden', step !== 2);
        document.getElementById('step-results').classList.toggle('hidden', step !== 3);

        updateStepIndicator(step);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    function updateStepIndicator(step) {
        var dots = document.querySelectorAll('.step-dot');
        var lines = document.querySelectorAll('.step-line');

        dots.forEach(function (dot, i) {
            var s = i + 1;
            dot.classList.remove('active', 'completed');
            if (s === step) dot.classList.add('active');
            else if (s < step) dot.classList.add('completed');
        });

        lines.forEach(function (line, i) {
            line.classList.toggle('active', i + 1 < step);
        });
    }

    // ============================================================
    // CALCULATION
    // ============================================================

    function calculateAndShowResults() {
        var cltSalary = parseCurrency(document.getElementById('clt-salary').value);
        var cltVr = parseCurrency(document.getElementById('clt-vr').value);
        var cltVt = parseCurrency(document.getElementById('clt-vt').value);
        var cltHealth = parseCurrency(document.getElementById('clt-health').value);
        var cltDental = parseCurrency(document.getElementById('clt-dental').value);
        var cltBonus = parseCurrency(document.getElementById('clt-bonus').value);
        var cltDependents = parseInt(document.getElementById('clt-dependents').value) || 0;

        var pjRevenue = parseCurrency(document.getElementById('pj-revenue').value);
        var pjRegime = document.getElementById('pj-regime').value;
        var pjAnexo = document.getElementById('pj-anexo').value;
        var pjAccountant = parseCurrency(document.getElementById('pj-accountant').value);
        var pjExpenses = parseCurrency(document.getElementById('pj-expenses').value);

        var cltBeneficios = {
            vr: cltVr,
            vt: cltVt,
            saude: cltHealth,
            odontologico: cltDental,
            plr: cltBonus,
        };

        var cltResult = calcularCLTAnual(cltSalary, cltBeneficios, cltDependents);

        var pjOptions = {
            regime: pjRegime === 'lucroPresumido' ? 'lucroPresumido' : pjRegime,
            anexo: pjAnexo,
            custoContadorMensal: pjAccountant,
            despesasOperacionaisMensais: pjExpenses,
        };

        if (pjRegime === 'lucroPresumido') {
            pjOptions.atividade = 'servicos';
        }

        var pjResult = calcularPJAnual(pjRevenue, pjOptions);

        var cltTotal = cltResult.totalAnualComBeneficios;
        var pjTotal = pjResult.liquidoAnual;

        renderResults(cltResult, pjResult, cltTotal, pjTotal);

        if (window.CLTxPJAnalytics) {
            var winner = pjTotal > cltTotal ? 'PJ' : 'CLT';
            window.CLTxPJAnalytics.funnel.simulationComplete(winner, cltSalary, pjRevenue);
        }
    }

    // ============================================================
    // RENDER RESULTS
    // ============================================================

    function renderResults(clt, pj, cltTotal, pjTotal) {
        var winnerName = document.getElementById('winner-name');
        var winnerDiff = document.getElementById('winner-diff');
        var barClt = document.getElementById('bar-clt');
        var barPj = document.getElementById('bar-pj');

        if (pjTotal > cltTotal) {
            var diffPj = pjTotal - cltTotal;
            winnerName.innerHTML = '<span class="text-amber-400">PJ</span> e mais vantajosa';
            winnerDiff.innerHTML = 'Diferenca de <strong>' + formatMoney(diffPj) + '</strong> por ano';
        } else if (cltTotal > pjTotal) {
            var diffClt = cltTotal - pjTotal;
            winnerName.innerHTML = '<span class="text-green-400">CLT</span> e mais vantajosa';
            winnerDiff.innerHTML = 'Diferenca de <strong>' + formatMoney(diffClt) + '</strong> por ano';
        } else {
            winnerName.textContent = 'Empate tecnico';
            winnerDiff.textContent = 'Considere outros fatores como estabilidade e perfil de risco.';
        }

        var total = cltTotal + pjTotal || 1;
        barClt.style.width = ((cltTotal / total) * 100) + '%';
        barPj.style.width = ((pjTotal / total) * 100) + '%';

        document.getElementById('res-clt-annual').textContent = formatMoney(cltTotal);
        document.getElementById('res-clt-monthly').textContent = '≈ ' + formatMoney(cltTotal / 12) + '/mes';
        document.getElementById('res-pj-annual').textContent = formatMoney(pjTotal);
        document.getElementById('res-pj-monthly').textContent = '≈ ' + formatMoney(pjTotal / 12) + '/mes';

        renderCltBreakdown(clt);
        renderPjBreakdown(pj);

        goToStep(3);
    }

    function renderCltBreakdown(clt) {
        var tbody = document.querySelector('#clt-breakdown tbody');
        var rows = [
            ['Salario liquido (12 meses)', clt.salarioLiquidoMensal * 12],
            ['13o salario liquido', clt.decimoTerceiroLiquido],
            ['Ferias + 1/3 liquido', clt.feriasMaisUmTercoLiquido],
            ['Beneficios (anual)', clt.totalBeneficiosAnual],
            ['FGTS (anual)', clt.totalFGTSAnual],
            ['INSS (anual)', clt.totalINSSAnual],
            ['IRRF (anual)', clt.totalIRRFAnual],
            ['Total com beneficios', clt.totalAnualComBeneficios],
        ];
        tbody.innerHTML = rows.map(function (r) {
            return '<tr><td>' + r[0] + '</td><td>' + formatMoney(r[1]) + '</td></tr>';
        }).join('');
    }

    function renderPjBreakdown(pj) {
        var tbody = document.querySelector('#pj-breakdown tbody');
        var rows = [
            ['Faturamento bruto (anual)', pj.faturamentoAnual],
            ['Impostos (anual)', pj.impostosAnual],
            ['INSS pro-labore (anual)', pj.inssProLaboreAnual],
            ['IRRF pro-labore (anual)', pj.irrfProLaboreAnual],
            ['Contador (anual)', pj.custoContadorAnual],
            ['Despesas operacionais', pj.despesasOperacionaisAnual],
            ['Total custos', pj.totalCustosAnual],
            ['Liquido anual', pj.liquidoAnual],
        ];
        tbody.innerHTML = rows.map(function (r) {
            return '<tr><td>' + r[0] + '</td><td>' + formatMoney(r[1]) + '</td></tr>';
        }).join('');
    }

    // ============================================================
    // LOCAL STORAGE PERSISTENCE
    // ============================================================

    var STORAGE_KEY = 'cltxpj_comparison';
    var saveTimeout;

    function autoSave() {
        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(function () {
            var data = {
                cltSalary: document.getElementById('clt-salary').value,
                cltVr: document.getElementById('clt-vr').value,
                cltVt: document.getElementById('clt-vt').value,
                cltHealth: document.getElementById('clt-health').value,
                cltDental: document.getElementById('clt-dental').value,
                cltBonus: document.getElementById('clt-bonus').value,
                cltDependents: document.getElementById('clt-dependents').value,
                pjRevenue: document.getElementById('pj-revenue').value,
                pjRegime: document.getElementById('pj-regime').value,
                pjAnexo: document.getElementById('pj-anexo').value,
                pjAccountant: document.getElementById('pj-accountant').value,
                pjExpenses: document.getElementById('pj-expenses').value,
                step: currentStep,
            };
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
                showSaveIndicator();
            } catch (e) {}
        }, 500);
    }

    function loadSaved() {
        try {
            var raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return;
            var data = JSON.parse(raw);
            if (data.cltSalary) document.getElementById('clt-salary').value = data.cltSalary;
            if (data.cltVr) document.getElementById('clt-vr').value = data.cltVr;
            if (data.cltVt) document.getElementById('clt-vt').value = data.cltVt;
            if (data.cltHealth) document.getElementById('clt-health').value = data.cltHealth;
            if (data.cltDental) document.getElementById('clt-dental').value = data.cltDental;
            if (data.cltBonus) document.getElementById('clt-bonus').value = data.cltBonus;
            if (data.cltDependents !== undefined) document.getElementById('clt-dependents').value = data.cltDependents;
            if (data.pjRevenue) document.getElementById('pj-revenue').value = data.pjRevenue;
            if (data.pjRegime) document.getElementById('pj-regime').value = data.pjRegime;
            if (data.pjAnexo) document.getElementById('pj-anexo').value = data.pjAnexo;
            if (data.pjAccountant) document.getElementById('pj-accountant').value = data.pjAccountant;
            if (data.pjExpenses) document.getElementById('pj-expenses').value = data.pjExpenses;
            onRegimeChange();
        } catch (e) {}
    }

    function showSaveIndicator() {
        var el = document.getElementById('save-indicator');
        el.classList.add('visible');
        setTimeout(function () {
            el.classList.remove('visible');
        }, 2000);
    }

    window.resetComparison = function () {
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch (e) {}
        document.getElementById('clt-salary').value = '';
        document.getElementById('clt-vr').value = 'R$ 700,00';
        document.getElementById('clt-vt').value = 'R$ 280,00';
        document.getElementById('clt-health').value = 'R$ 500,00';
        document.getElementById('clt-dental').value = 'R$ 50,00';
        document.getElementById('clt-bonus').value = 'R$ 0,00';
        document.getElementById('clt-dependents').value = '0';
        document.getElementById('pj-revenue').value = '';
        document.getElementById('pj-regime').value = 'simples';
        document.getElementById('pj-anexo').value = 'anexo5';
        document.getElementById('pj-accountant').value = 'R$ 400,00';
        document.getElementById('pj-expenses').value = 'R$ 0,00';
        onRegimeChange();
        goToStep(1);
    };

    // ============================================================
    // INIT
    // ============================================================

    document.addEventListener('DOMContentLoaded', function () {
        setupInputMask('clt-salary');
        setupInputMask('clt-vr');
        setupInputMask('clt-vt');
        setupInputMask('clt-health');
        setupInputMask('clt-dental');
        setupInputMask('clt-bonus');
        setupInputMask('pj-revenue');
        setupInputMask('pj-accountant');
        setupInputMask('pj-expenses');

        loadSaved();
        onRegimeChange();

        if (window.CLTxPJAnalytics) {
            window.CLTxPJAnalytics.init();
        }
    });
})();
