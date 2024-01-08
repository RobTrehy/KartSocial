import Select from '@/Components/Forms/Select';
import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { sessionLapContext } from '../Edit';

export default function AlphaDataImporter({ }: any) {
  const [file, setFile] = useState<File | null>(null);
  const [excelRows, setExcelRows] = useState<Array<any> | null>(null);
  const [driver, setDriver] = useState<string | null>(null);

  const fileReader = new FileReader();

  const { importLaps, setImportLaps, importReady, setImportReady }: any =
    useContext(sessionLapContext);

  useEffect(() => {
    if (file && fileReader.readAsBinaryString) {
      fileReader.onload = e => {
        processExcel(fileReader.result);
      };
      fileReader.readAsBinaryString(file);
    }
  }, [file]);

  useEffect(() => {
    if (driver) {
      let laps: Array<object> = [];
      excelRows?.map((row, i) => {
        if (i > 1) {
          laps.push({
            lap_number: i - 1,
            lap_time: row[driver],
          });
        }
      });
      setImportLaps([...importLaps, ...laps]);
      setImportReady(true);
    }
  }, [driver]);

  const handleOnSubmit = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const processExcel = (data: any) => {
    const workbook = XLSX.read(data, { type: 'binary' });
    const firstSheet = workbook.SheetNames[0];
    setExcelRows(
      XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]),
    );
  };

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {
        !importReady ? (
          <>
            {!excelRows && (
              <label className="cursor-pointer items-center text-center w-full border-2 rounded-md border-dashed hover:bg-gray-100 hover:border-gray-300">
                <div className="flex flex-row items-center justify-center pt-3">
                  <p className="text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                    Upload File
                  </p>
                </div>
                <input
                  type="file"
                  onChange={handleOnSubmit}
                  accept={'.xlsx'}
                  className="opacity-0"
                />
              </label>
            )}
            {excelRows && (
              <Select
                id="driver"
                name="driver"
                title="Driver"
                onChange={e => setDriver(e.currentTarget.value)}
              >
                <option>Select Driver...</option>
                {Object.keys(excelRows[1]).map(row => {
                  if (row.startsWith('__EMPTY')) {
                    return (
                      <option value={row} key={row}>
                        {excelRows[1][row]}
                      </option>
                    );
                  }
                })}
              </Select>
            )}
          </>
        ) : (
          <div className="flex flex-row dark:text-gray-400 items-center gap-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 stroke-lime-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <p>Ready for import!</p>
          </div>
        )
      }
    </div>
  );
}
