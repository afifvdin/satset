"use client"

import axios from "axios"
import Image from "next/image"
import React, { useState } from "react"
import toast from "react-hot-toast"

type FileType = {
  url: string
  file: File
  isStego: boolean
}

type ModeType =
  | "google_net"
  | "mobile_net_v2"
  | "qx_net"
  | "xception_net"
  | "yedroudj_net"

export default function Action() {
  const [files, setFiles] = useState<FileType[]>([])
  const [selectedFileId, setSelectedFileId] = useState<number | null>(null)
  const [isProcess, setIsProcess] = useState<boolean>(false)
  const [isDetected, setIsDetected] = useState<boolean>(false)
  const [mode, setMode] = useState<ModeType>("google_net")

  const doChangeMode = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (isProcess) return
    setMode(e.currentTarget.value as ModeType)
  }

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
        res.push({ file: file, url: url, isStego: false })
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

  const doDetect = async () => {
    if (isProcess) return
    const loading = toast.loading("Working on it..")
    setIsDetected(false)
    setIsProcess(true)
    try {
      const form = new FormData()
      form.append("mode", mode)
      files.map((file, i) => {
        form.append("images", file.file)
      })
      const { data } = await axios.post(process.env.BASE_API!, form)
      setFiles(
        files.map((file, i) => {
          file.isStego = data["labels"][i] == "Steganography"
          return file
        })
      )
      setIsProcess(false)
      setIsDetected(true)
      toast.success("Completed", { id: loading })
    } catch (error) {
      setIsProcess(false)
      toast.error("Please try again", { id: loading })
    }
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
            htmlFor={isProcess ? "" : "files"}
            className="cursor-pointer border-2 border-black px-4 xl:px-6 hover:px-8 py-1.5 xl:py-3 transition-all"
          >
            CHOOSE MY FILES
          </label>
        </div>
      ) : (
        <div className="px-2 xl:px-8">
          <div className="flex-grow flex flex-col h-[36rem]">
            <div className="flex flex-wrap gap-4 items-center justify-between mb-2">
              <p>YOUR FILES ({files.length})</p>
              <div className="flex items-center justify-end gap-4">
                <p>MODEL</p>
                <select
                  value={mode}
                  onChange={doChangeMode}
                  className="!outline-none !bg-white !rounded-none cursor-pointer border-2 border-black px-3 py-1.5 transition-all"
                >
                  <option value="google_net">GoogleNet (Recommended)</option>
                  <option value="mobile_net_v2">MobileNetV2</option>
                  <option value="qx_net">QxNet</option>
                  <option value="xception_net">XceptionNet</option>
                  <option value="yedroudj_net">YedroudjNet</option>
                </select>
              </div>
            </div>
            <div className="flex-grow overflow-y-auto w-full p-2 xl:p-4 flex flex-wrap gap-2 xl:gap-4 border-2 border-black">
              {files.map((file, i) => {
                return (
                  <div
                    key={i}
                    data-value={i.toString()}
                    onClick={doSelectFileId}
                    className="relative cursor-pointer h-48 w-48"
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
                        (isDetected
                          ? selectedFileId == i
                            ? "bg-opacity-75"
                            : "bg-opacity-50"
                          : selectedFileId == i
                          ? "bg-opacity-50"
                          : "bg-opacity-0") +
                        " absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black"
                      }
                    >
                      <p className="-rotate-45 text-white text-lg">
                        {isDetected
                          ? file.isStego
                            ? "Steganography"
                            : "Normal"
                          : ""}
                      </p>
                    </div>
                  </div>
                )
              })}
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
