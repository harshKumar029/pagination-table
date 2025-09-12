import React, { useState, useEffect, useCallback, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Button } from 'primereact/button';

const PAGE_SIZE = 12; // as per API limit

const Dashboard = () => {
  const [artworks, setArtworks] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // 1-based page index
  const [selectedRows, setSelectedRows] = useState({}); // { [id]: true }
  const [inputValue, setInputValue] = useState('');
  const [totalSelectedCount, setTotalSelectedCount] = useState(0); // total rows to select across pages
  const op = useRef(null);

  // Fetch data for given page
  const fetchData = useCallback(async (pageNumber) => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.artic.edu/api/v1/artworks?page=${pageNumber}&limit=${PAGE_SIZE}`);
      const json = await response.json();

      setArtworks(json.data);
      setTotalRecords(json.pagination.total);
    } catch (error) {
      console.error('Error fetching artworks:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch initial page and on page change
  useEffect(() => {
    fetchData(page);
  }, [page, fetchData]);

  // Helper: fetch multiple pages to get enough rows for selection
  const fetchRowsForSelection = useCallback(async (count) => {
    const pagesNeeded = Math.ceil(count / PAGE_SIZE);
    let allRows = [];
    for (let p = 1; p <= pagesNeeded; p++) {
      try {
        const response = await fetch(`https://api.artic.edu/api/v1/artworks?page=${p}&limit=${PAGE_SIZE}`);
        const json = await response.json();
        allRows = allRows.concat(json.data);
      } catch (error) {
        console.error('Error fetching artworks for selection:', error);
        break;
      }
    }
    return allRows.slice(0, count);
  }, []);

  // When user submits a number to select rows
  const onSelectRowsSubmit = async () => {
    let count = parseInt(inputValue, 10);
    if (isNaN(count) || count <= 0) {
      return;
    }
    if (count > totalRecords) {
      count = totalRecords;
    }

    setLoading(true);
    const rowsToSelect = await fetchRowsForSelection(count);
    setLoading(false);

    // Build new selectedRows object keyed by id
    const newSelected = {};
    rowsToSelect.forEach((row) => {
      newSelected[row.id] = true;
    });

    setSelectedRows(newSelected);
    setTotalSelectedCount(count);
    op.current.hide();
  };

  // Handle page change event from DataTable paginator
  const onPageChange = (event) => {
    const newPage = Math.floor(event.first / event.rows) + 1;
    setPage(newPage);
  };

  // Prepare selected rows array for DataTable selection prop (only current page rows)
  const selectedRowsArray = artworks.filter((art) => selectedRows[art.id]);

  // Handle manual selection change from checkbox
  const onSelectionChange = (e) => {
    const newSelected = { ...selectedRows };

    // Remove all current page rows from selection
    artworks.forEach((art) => {
      delete newSelected[art.id];
    });

    // Add currently selected rows from this page
    e.value.forEach((art) => {
      newSelected[art.id] = true;
    });

    setSelectedRows(newSelected);

    // Reset totalSelectedCount and inputValue because user manually changed selection
    setTotalSelectedCount(0);
    setInputValue('');
  };

  // Handle select all checkbox in header
  const onSelectAllChange = (e) => {
    const newSelected = { ...selectedRows };
    if (e.target.checked) {
      artworks.forEach((art) => {
        newSelected[art.id] = true;
      });
    } else {
      artworks.forEach((art) => {
        delete newSelected[art.id];
      });
    }
    setSelectedRows(newSelected);

    // Reset totalSelectedCount and inputValue on manual select all toggle
    setTotalSelectedCount(0);
    setInputValue('');
  };

  // Custom header for selection column with checkbox and chevron icon
  const selectionHeader = (
    <div >
      {/* Select all checkbox for current page */}

      {/* Chevron down icon button */}
      <Button
        icon="pi pi-chevron-down"
        className="p-button-text p-button-rounded p-button-sm"
        onClick={(e) => op.current.toggle(e)}
        aria-label="Open selection options"
      />
    </div>
  );

  return (
    <div className="w-[95%] m-auto mt-5 space-y-3">
      <DataTable
        value={artworks}
        paginator
        rows={PAGE_SIZE}
        totalRecords={totalRecords}
        lazy
        first={(page - 1) * PAGE_SIZE}
        onPage={onPageChange}
        loading={loading}
        selectionMode="multiple"
        selection={selectedRowsArray}
        onSelectionChange={onSelectionChange}
        dataKey="id"
        responsiveLayout="scroll"
      >
        <Column
          selectionMode="multiple"
        ></Column>
        <Column header={selectionHeader}>hi</Column>
        <Column field="title" header="Title" />
        <Column field="place_of_origin" header="Place of Origin" />
        <Column field="artist_display" header="Artist Display" />
        <Column field="inscriptions" header="Inscriptions" />
        <Column field="date_start" header="Date Start" />
        <Column field="date_end" header="Date End" />
      </DataTable>

      <OverlayPanel ref={op} showCloseIcon style={{ width: '250px' }}>
        <div className="p-fluid  p-formgrid p-grid" style={{ gap: '1rem' }}>
          <div className="p-field p-col-12">
            <label htmlFor="rowCountInput">Select number of rows:</label>
            <input
              id="rowCountInput"
              type="number"
              min="1"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={`Enter number of rows.`}
              className="p-inputtext p-component"
              style={{ width: '100%' }}
            />
          </div>
          <div className="p-field p-col-12" style={{ textAlign: 'right' }}>
            <Button label="Submit" onClick={onSelectRowsSubmit} />
          </div>
        </div>
      </OverlayPanel>
    </div>
  );
};

export default Dashboard;
