import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { sessionLapContext } from '../Edit';

export default function RaceChronoDataImporter({ }: any) {
  const [file, setFile] = useState<File | null>(null);
  const [excelRows, setExcelRows] = useState<Array<any> | null>(null);

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
    if (excelRows) {
      let laps: Array<object> = [];
      excelRows?.map((row, i) => {
        if ((!isNaN(row[0]) && row[0] !== '' && row[1] !== '*')) {
          laps.push({
            lap_number: parseInt(row[0]),
            lap_time: row[1],
          });
        }
      });
      setImportLaps([...importLaps, ...laps]);
      setImportReady(true);
    }
  }, [excelRows]);

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
      XLSX.utils.sheet_to_json(workbook.Sheets[firstSheet], { range: 8, header: 1 }),
    );
  };

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {!importReady ? (
        <label className="group cursor-pointer items-center text-center w-full border rounded-md border-dashed hover:bg-brand-50 hover:border-brand-600 dark:hover:bg-gray-800 dark:hover:border-brand-500">
          <div className="flex flex-row items-center justify-center pt-3">
            <p className="text-md tracking-wider text-gray-400 group-hover:text-brand-600 dark:group-hover:text-brand-500">
              Upload File
            </p>
          </div>
          <input
            type="file"
            onChange={handleOnSubmit}
            accept={'.ods'}
            className="opacity-0"
          />
        </label>
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
