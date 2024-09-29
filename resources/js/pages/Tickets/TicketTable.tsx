import Layout from "@/layouts/Layout"


import { router, Link, Head } from '@inertiajs/react';
import { Button } from "@/components/ui/button"

import { AgGridReact } from "@ag-grid-community/react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { CellEditRequestEvent, CellValueChangedEvent, ColDef, ColGroupDef, ColumnVisibleEvent, SizeColumnsToContentStrategy, SizeColumnsToFitGridStrategy, SizeColumnsToFitProvidedWidthStrategy } from '@ag-grid-community/core';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import React, { StrictMode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AG_GRID_LOCALE_EG } from '@ag-grid-community/locale';
import { __ } from "@/lib/i18n";
import { useAtom } from "jotai";
import LayoutFull from "@/layouts/LayoutFull";
import { ticketAtom, ticketDataAtom } from "@/atoms/TicketAtoms";

export default function TicketTable({ data }) {

    const [ticketsData, setTicketsData] = useAtom(ticketDataAtom);

    if (ticketsData == null) {
        setTicketsData(data);
    }

    return (
        <LayoutFull title={"الطلبات"} tabs={false}>
            <Head title={"الطلبات"} />
            <div className="h-full">
                <div className="bg-white rounded-sm shadow-sm h-full" x-chunk="tasktable-chunk-1">
                    <StrictMode>
                        <GridExample rows={ticketsData && ticketsData.tickets} />
                    </StrictMode>
                </div>
            </div>


        </LayoutFull>
    )
}


ModuleRegistry.registerModules([ClientSideRowModelModule]);

const gridDiv = document.querySelector("#myGrid");

const GridExample = ({ rows }) => {

    const [rowData, setRowData] = useState(rows);

    useEffect(() => {
        setRowData(rows)
    }, [rows])

    interface RowData {
        subject: any;
    }


    const [columnDefs, setColumnDefs] = useState<(ColDef<RowData> | ColGroupDef<RowData>)[]>([
        {
            field: "subject",
            headerName: 'الطلب',
            width: 350,
            editable: true
        }
    ]);

    return (
        <div
            className={
                "ag-theme-quartz h-full"
            }
        // style={{ height: 100 }}
        >
            <AgGridReact
                rowData={rowData}
                // @ts-ignore
                columnDefs={columnDefs}
                suppressRowClickSelection={true}
                pagination={true}
                paginationPageSize={10}
                paginationPageSizeSelector={[10, 25, 50]}
            />
        </div>
    );
};