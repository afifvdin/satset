"use client"

import Image from "next/image"
import React, { useState } from "react"

type FileType = {
  url: string
  file: File
  isSuspicious: boolean
}

export default function Action() {
  const [files, setFiles] = useState<FileType[]>([])
  const [selectedFileId, setSelectedFileId] = useState<number | null>(null)
  const [isProcess, setIsProcess] = useState<boolean>(false)

  const doPickFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isProcess) return
    const pickedFiles = e.target.files
    if (pickedFiles && pickedFiles.length > 0) {
      const res: FileType[] = [...files]
      for (let i = 0; i < pickedFiles.length; i++) {
        const file = pickedFiles[i]
        if (!file.type.startsWith("image/")) {
          continue
        }
        const url = URL.createObjectURL(file)
        res.push({ file: file, url: url, isSuspicious: false })
      }
      setFiles(res)
    }
  }

  const doSelectFileId = (e: React.MouseEvent<HTMLDivElement>) => {
    setSelectedFileId(parseInt(e.currentTarget.getAttribute("data-value")!))
  }

  const doRemoveFile = () => {
    if (isProcess) return
    let res: FileType[] = [...files]
    res = res.filter((_, i) => i != selectedFileId)
    setSelectedFileId(null)
    setFiles(res)
  }

  const doClearFile = () => {
    if (isProcess) return
    setFiles([])
  }

  const doDetect = () => {
    if (isProcess) return
    setIsProcess(true)
  }

  return (
    <div className="p-4 xl:p-16">
      <input
        id="files"
        type="file"
        multiple
        accept="image/*"
        onChange={doPickFiles}
        className="hidden"
      />
      {files.length == 0 ? (
        <div className="flex items-center justify-center h-[36rem]">
          <label
            htmlFor="files"
            className="cursor-pointer border-2 border-black px-4 xl:px-6 hover:px-8 py-1.5 xl:py-3 transition-all"
          >
            CHOOSE MY FILES
          </label>
        </div>
      ) : (
        <div className="px-2 xl:px-8">
          <div className="xl:flex justify-between xl:gap-8 xl:h-[36rem]">
            <div className="flex-grow flex flex-col h-[36rem] xl:h-auto">
              <p className="py-2 xl:py-4">YOUR FILES ({files.length})</p>
              <div className="flex-grow overflow-y-auto w-full p-2 xl:p-4 flex flex-wrap gap-2 xl:gap-4 border-2 border-black">
                {files.map((file, i) => {
                  return (
                    <div
                      key={i}
                      data-value={i.toString()}
                      onClick={doSelectFileId}
                      className={
                        (i == selectedFileId
                          ? "border-black"
                          : "border-transparent") +
                        " border-2 relative cursor-pointer h-48 w-48"
                      }
                    >
                      <Image
                        src={file.url}
                        alt=""
                        fill
                        sizes="auto"
                        className="bg-cover object-cover"
                      />
                      <div
                        className={
                          (i == selectedFileId
                            ? "bg-opacity-50"
                            : "bg-opacity-0") +
                          " absolute top-0 left-0 w-full h-full bg-blue-100"
                        }
                      />
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="flex flex-col">
              <p className="py-2 xl:py-4">MESSAGE</p>
              <textarea
                value={""}
                placeholder="Type your message"
                className="w-full xl:w-96 flex-grow border-2 border-black p-2 xl:p-4"
              />
            </div>
          </div>
          <br />
          <div className="flex flex-wrap whitespace-nowrap items-center gap-2 xl:gap-4">
            <label
              htmlFor="files"
              className="cursor-pointer border-2 border-black px-4 xl:px-6 hover:px-8 py-1.5 xl:py-3 transition-all"
            >
              ADD MORE FILES
            </label>
            <button
              onClick={doClearFile}
              className="border-2 border-black px-4 xl:px-6 hover:px-8 py-1.5 xl:py-3 transition-all"
            >
              CLEAR FILES
            </button>
            {selectedFileId != null ? (
              <>
                |
                <button
                  onClick={doRemoveFile}
                  className="border-2 border-black px-4 xl:px-6 hover:px-8 py-1.5 xl:py-3 transition-all"
                >
                  REMOVE
                </button>
              </>
            ) : (
              ""
            )}
            |
            <button
              onClick={doDetect}
              className="border-2 border-black px-4 xl:px-6 hover:px-8 py-1.5 xl:py-3 transition-all"
            >
              DETECT ({files.length})
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
