"use client"

import Image from "next/image"
import React, { useState } from "react"

type FileType = {
  url: string
  file: File
  text: string
}

export default function Action() {
  const [tab, setTab] = useState<string>("generate")
  const [generateFiles, setGenerateFiles] = useState<FileType[]>([])
  const [extractFiles, setExtractFiles] = useState<FileType[]>([])
  const [selectedGenerateId, setSelectedGenerateId] = useState<number | null>(
    null
  )
  const [selectedExtractId, setSelectedExtractId] = useState<number | null>(
    null
  )
  const [isProcess, setIsProcess] = useState<boolean>(false)

  const doChangeTab = (e: React.MouseEvent<HTMLButtonElement>) => {
    setTab(e.currentTarget.value)
  }

  const doPickGenerateFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isProcess) return
    const pickedFiles = e.target.files
    if (pickedFiles && pickedFiles.length > 0) {
      const res: FileType[] = [...generateFiles]
      for (let i = 0; i < pickedFiles.length; i++) {
        const file = pickedFiles[i]
        if (!file.type.startsWith("image/")) {
          continue
        }
        const url = URL.createObjectURL(file)
        res.push({ file: file, url: url, text: "" })
      }
      setGenerateFiles(res)
    }
  }

  const doSelectGenerateId = (e: React.MouseEvent<HTMLDivElement>) => {
    setSelectedGenerateId(parseInt(e.currentTarget.getAttribute("data-value")!))
  }

  const doRemoveGenerateFile = () => {
    if (isProcess) return
    let res: FileType[] = [...generateFiles]
    res = res.filter((_, i) => i != selectedGenerateId)
    setSelectedGenerateId(null)
    setGenerateFiles(res)
  }

  const doClearGenerateFile = () => {
    if (isProcess) return
    setGenerateFiles([])
  }

  const doChangeGenerateMessage = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (isProcess) return
    setGenerateFiles(
      generateFiles.map((file, i) => {
        if (i == selectedGenerateId) {
          file.text = e.currentTarget.value
        }
        return file
      })
    )
  }

  const doGenerate = () => {
    if (isProcess) return
  }

  const doPickExtractFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isProcess) return
    const pickedFiles = e.target.files
    if (pickedFiles && pickedFiles.length > 0) {
      const res: FileType[] = [...extractFiles]
      for (let i = 0; i < pickedFiles.length; i++) {
        const file = pickedFiles[i]
        if (!file.type.startsWith("image/")) {
          continue
        }
        const url = URL.createObjectURL(file)
        res.push({ file: file, url: url, text: "" })
      }
      setExtractFiles(res)
    }
  }

  const doSelectExtractId = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isProcess) return
    setSelectedExtractId(parseInt(e.currentTarget.getAttribute("data-value")!))
  }

  const doRemoveExtractFile = () => {
    if (isProcess) return
    let res: FileType[] = [...extractFiles]
    res = res.filter((_, i) => i != selectedExtractId)
    setSelectedExtractId(null)
    setExtractFiles(res)
  }

  const doClearExtractFile = () => {
    if (isProcess) return
    setExtractFiles([])
  }

  const doExtract = () => {
    if (isProcess) return
  }

  return (
    <div className="p-4 xl:p-16">
      <div className="flex items-center gap-4">
        <button
          value="generate"
          onClick={doChangeTab}
          className={
            (tab == "generate" ? "underline" : "") +
            " text-lg xl:text-2xl underline-offset-8 px-4 xl:px-6 py-1.5 xl:py-3"
          }
        >
          GENERATE
        </button>
        <button
          value="extract"
          onClick={doChangeTab}
          className={
            (tab == "extract" ? "underline" : "") +
            " text-lg xl:text-2xl underline-offset-8 px-4 xl:px-6 py-1.5 xl:py-3"
          }
        >
          EXTRACT
        </button>
      </div>
      <br />
      <input
        id="files"
        type="file"
        multiple
        accept="image/*"
        onChange={tab == "generate" ? doPickGenerateFiles : doPickExtractFiles}
        className="hidden"
      />
      {tab == "generate" ? (
        generateFiles.length == 0 ? (
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
                <p className="py-2 xl:py-4">
                  YOUR FILES ({generateFiles.length})
                </p>
                <div className="flex-grow overflow-y-auto w-full p-2 xl:p-4 flex flex-wrap gap-2 xl:gap-4 border-2 border-black">
                  {generateFiles.map((file, i) => {
                    return (
                      <div
                        key={i}
                        data-value={i.toString()}
                        onClick={doSelectGenerateId}
                        className={
                          (i == selectedGenerateId
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
                            (i == selectedGenerateId
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
                  value={
                    selectedGenerateId != null
                      ? generateFiles[selectedGenerateId].text
                      : ""
                  }
                  onChange={doChangeGenerateMessage}
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
                onClick={doClearGenerateFile}
                className="border-2 border-black px-4 xl:px-6 hover:px-8 py-1.5 xl:py-3 transition-all"
              >
                CLEAR FILES
              </button>
              {selectedGenerateId != null ? (
                <>
                  |
                  <button
                    onClick={doRemoveGenerateFile}
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
                onClick={doGenerate}
                className="border-2 border-black px-4 xl:px-6 hover:px-8 py-1.5 xl:py-3 transition-all"
              >
                GENERATE ({generateFiles.length})
              </button>
            </div>
          </div>
        )
      ) : extractFiles.length == 0 ? (
        <div className="flex items-center justify-center h-[36rem]">
          <label
            htmlFor="files"
            className="cursor-pointer border-2 border-black px-4 xl:px-6 hover:px-8 py-1.5 xl:py-3 transition-all"
          >
            CHOOSE MY FILES
          </label>
        </div>
      ) : (
        <div className="px-4 xl:px-8">
          <div className="xl:flex justify-between gap-8 xl:h-[36rem]">
            <div className="flex-grow flex flex-col h-[36rem] xl:h-auto">
              <p className="py-2 xl:py-4">YOUR FILES ({extractFiles.length})</p>
              <div className="flex-grow overflow-y-auto w-full p-2 xl:p-4 flex flex-wrap gap-2 xl:gap-4 border-2 border-black">
                {extractFiles.map((file, i) => {
                  return (
                    <div
                      key={i}
                      data-value={i.toString()}
                      onClick={doSelectExtractId}
                      className={
                        (i == selectedExtractId
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
                          (i == selectedExtractId
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
              <div className="w-full xl:w-96 flex-grow border-2 border-black p-2 xl:p-4">
                {selectedExtractId != null
                  ? extractFiles[selectedExtractId].text
                  : ""}
              </div>
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
              onClick={doClearExtractFile}
              className="border-2 border-black px-4 xl:px-6 hover:px-8 py-1.5 xl:py-3 transition-all"
            >
              CLEAR FILES
            </button>
            {selectedExtractId != null ? (
              <>
                |
                <button
                  onClick={doRemoveExtractFile}
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
              onClick={doExtract}
              className="border-2 border-black px-4 xl:px-6 hover:px-8 py-1.5 xl:py-3 transition-all"
            >
              EXTRACT ({extractFiles.length})
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
