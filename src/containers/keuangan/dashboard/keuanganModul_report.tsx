import { Component, createSignal } from 'solid-js';
import Table_income_report from '../../dashboard/report/table_report/table_income_report';
import Table_expenses_report from '../../dashboard/report/table_report/table_expenses_report';
import Piechart_report from '../../dashboard/report/piechart_report/piechart_report';
import Barchart_inex_report2 from './barchart_inex_report2';
// import ReportNavbar from '../reportNavbar';
import { Icon } from '@iconify-icon/solid';
import './keuanganModul_report.css';
import Header from '../../header/header';


const KeuanganModul_report: Component = () => {
    const [showIncomeTable, setShowIncomeTable] = createSignal(false);
    const [showExpensesTable, setShowExpensesTable] = createSignal(false);

    const toggleIncomeTable = () => {
        setShowIncomeTable(!showIncomeTable());
        setShowExpensesTable(false); // Pastikan tabel Expenses disembunyikan saat menampilkan tabel Income
    };

    const toggleExpensesTable = () => {
        setShowExpensesTable(!showExpensesTable());
        setShowIncomeTable(false); // Pastikan tabel Income disembunyikan saat menampilkan tabel Expenses
    };

    return (
        <div>
            <div class="report-container">
                <div class="barchartReport-container">
                    <Barchart_inex_report2 />
                </div>
                {/* div untuk income container dan expenses container */}
                <div class="inex-container" style={{
                    "margin-top": "25px",
                    "justify-content": "center",
                    "text-align": "center",
                    "align-items": "center",
                    "display": "flex"
                }}>
                    {/* ====== button untuk menampilkan tabel income ====== */}
                    <div>
                        <button onClick={toggleIncomeTable} class={`button-toggle ${showIncomeTable() ? 'active' : ''}`} style={{
                            "width": "242px",
                            "height": "68px",
                            "background-color": showIncomeTable() ? "#6E49E9" : "#8467FFCC",
                            "border-radius": "10px",
                            "border": "1px solid rgba(128, 128, 128, 0.20)",
                            "box-shadow": "0 5px 5px rgba(0, 0, 0, 0.2)",
                            "margin-right": "20px",
                            "position": "relative"
                        }}>
                            <div class="inexcome-info">
                                <div class="inexcome-title" style={{
                                    "display": "flex",
                                    "padding-left": "20px",
                                    "padding-top": "5px"
                                }}>
                                    <img src="src/assets/img/money-recive.png" alt="money-recive.png" style={{ "width": "27px", "height": "27px" }} />
                                    <p style={{
                                        "padding-left": "20px",
                                        "font-weight": "500", "font-size": "18px"
                                    }}>Total Pemasukan</p>
                                </div>

                                <div class="inexcome-amount" style={{
                                    "margin-left": "18px",
                                    "font-weight": "500",
                                    "font-size": "18px"
                                }}>
                                    <p>Rp133.890.000</p>
                                </div>
                            </div>
                            {showIncomeTable()}
                        </button>
                    </div>

                    {/* ====== button untuk menampilkan tabel expenses ====== */}
                    <div>
                        <button onClick={toggleExpensesTable} class={`button-toggle ${showExpensesTable() ? 'active' : ''}`} style={{
                            "width": "242px",
                            "height": "68px",
                            "background-color": showExpensesTable() ? "#8A8A8B" : "#80808033",
                            "border-radius": "10px",
                            "border": "1px solid rgba(128, 128, 128, 0.20)",
                            "box-shadow": "0 5px 5px rgba(0, 0, 0, 0.2)",
                            "margin-right": "20px",
                            "position": "relative"
                        }}>
                            <div class="inexcome-info">
                                <div class="inexcome-title" style={{
                                    "display": "flex",
                                    "padding-left": "20px",
                                    "padding-top": "5px"
                                }}>
                                    <img src="src/assets/img/money-send.png" alt="money-send.png" style={{ "width": "27px", "height": "27px" }} />
                                    <p style={{
                                        "padding-left": "20px",
                                        "font-weight": "500", "font-size": "18px"
                                    }}>Total Pengeluaran</p>
                                </div>

                                <div class="inexcome-amount" style={{
                                    "margin-left": "18px",
                                    "font-weight": "500",
                                    "font-size": "18px"
                                }}>
                                    <p>Rp233.890.000</p>
                                </div>
                            </div>

                            {showExpensesTable()}
                        </button>
                    </div>
                </div>

                {/* div untuk piechart income, tabel, dan piechart excome */}
                <div class="pietab-inex-container">

                    <div class="tabel-inex-container" style={{ "padding-top": "25px" }}>
                        {showIncomeTable() && <Table_income_report />}
                        {showExpensesTable() && <Table_expenses_report />}
                    </div>

                    <div class="piechart-container">
                        <Piechart_report />
                    </div>
                </div>
            </div>
        </div>
    );
};


export default KeuanganModul_report;