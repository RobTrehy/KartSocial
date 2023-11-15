import React, { useContext, useEffect, useState } from "react";
import { createWorker } from "tesseract.js";
import { sessionLapContext } from "../Sessions/Lap";

export default function AppScreenImporter({ setProcessing }: any) {
    const [files, setFiles] = useState<Array<File>>([]);
    const [ocrQueue, setOcrQueue] = useState<Array<any>>([]);
    const [ocrDone, setOcrDone] = useState<Array<any>>([]);
    const [ocrData, setOcrData] = useState<Array<any>>([]);
    const [message, setMessage] = useState<string>();

    const { importLaps, setImportLaps, setImportReady }: any = useContext(sessionLapContext);

    const handleFile = (e: any) => {
        setMessage("");
        let uploads = e.target.files;
        let valid = [];

        for (let i = 0; i < uploads.length; i++) {
            const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
            if (validImageTypes.includes(uploads[i].type)) {
                valid.push(uploads[i]);
            } else {
                setMessage("Only Image Files are Accepted");
            }
        }
        setFiles([...files, ...valid]);
    }

    useEffect(() => {
        let newQueue: Array<any> = [];
        files.map((file: File) => {
            if (!ocrQueue.includes(file.name)) {
                newQueue.push(file.name);
            }
        });
        setOcrQueue([...ocrQueue, ...newQueue]);
    }, [files]);

    useEffect(() => {
        if (ocrQueue.length !== 0) {
            setProcessing(true);
            processImage(ocrQueue[0]);
        } else {
            setProcessing(false);
            if (ocrDone.length !== 0) {
                setImportReady(true);
            }
        }
    }, [ocrQueue]);

    useEffect(() => {
        if (ocrData.length !== 0) {
            findLapsInText();
        }
    }, [ocrData]);

    const processImage = async (name: string) => {
        if (!ocrDone.includes(name)) {
            const worker = await createWorker();
            await worker.loadLanguage('eng');
            await worker.initialize('eng');
            const { data: { text } } = await worker.recognize(URL.createObjectURL(files.filter(f => f.name === name)[0]));
            await worker.terminate();

            setOcrData([...ocrData, {
                name: name,
                text: text,
                processed: false,
                processing: false,
            }]);
            setOcrQueue(ocrQueue.filter(x => x !== name));
            setOcrDone([...ocrDone, name]);
        } else {
            setOcrQueue(ocrQueue.filter(x => x !== name));
        }
    }

    const findLapsInText = () => {
        Object.keys(ocrData).map((i) => {
            let data = ocrData[i];
            if (!data.processed && !data.processing) {
                ocrData[i].processing = true;
                setOcrData({ ...ocrData });

                let lapText = (data.text.indexOf("lap #") < 0) ? 0 : data.text.indexOf("lap #");
                let avgText = (data.text.indexOf("Avg.") < 0) ? data.text.length : data.text.indexOf("Avg.");
                let lapLines = data.text.substr(lapText, avgText - lapText).replace(/\r/g, "").split(/\n/);
                let laps: Array<object> = [];

                lapLines.map((line: string) => {
                    if (!isNaN(line.charAt(0))) {
                        let lap = line.split(" ");
                        if (lap[0] !== '' && !isNaN(+(lap[0])) && lap[1] !== undefined) {
                            laps.push({
                                lap_number: lap[0],
                                lap_time: lap[1]
                            });
                        }
                    }
                });
                setImportLaps([...importLaps, ...laps]);

                ocrData[i].processing = false;
                ocrData[i].processed = true;
                setOcrData({ ...ocrData });
            }
        })
    }

    const removeImage = (name: string) => {
        console.log(ocrQueue.includes(name));
        if (ocrQueue.includes(name)) {
            setOcrQueue(ocrQueue.filter(x => x !== name));
        }
        if (ocrDone.includes(name)) {
            setOcrDone(ocrDone.filter(x => x !== name));
            setOcrData(ocrData.filter(x => x.name !== name));
        }

        setFiles(files.filter(x => x.name !== name));
    }

    return (
        <div className="flex flex-col">
            <span className="flex justify-center items-center text-sm mb-1 text-red-500">{message}</span>
            <div className="flex flex-wrap gap-2 mt-2">
                {files.map((file, key) => {
                    return (
                        <div key={key} className="overflow-hidden relative">
                            <i onClick={() => { removeImage(file.name) }} className="absolute bottom-0 right-0 bg-white opacity-50 hover:opacity-100 text-red-500 cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </i>
                            <img alt="image-preview" className="h-32" src={URL.createObjectURL(file)} />
                        </div>
                    )
                })}
                <label className="cursor-pointer items-center text-center h-32 w-20 border-2 rounded-md border-dashed hover:bg-gray-100 hover:border-gray-300">
                    <div className="flex flex-row items-center justify-center pt-3">
                        <p className="text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                            Upload Image(s)
                        </p>
                    </div>
                    <input type="file" onChange={handleFile} className="opacity-0" multiple name="files[]" />
                </label>
            </div>
        </div>
    )
}