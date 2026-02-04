import { ImageResponse } from "next/og"

export const size = {
    width: 1200,
    height: 630,
}

export const contentType = "image/png"

let jetbrainsMono: ArrayBuffer | null = null

async function loadJetBrainsMono(): Promise<ArrayBuffer | undefined> {
    if (jetbrainsMono) {
        return jetbrainsMono
    }

    const fontUrl = "https://raw.githubusercontent.com/JetBrains/JetBrainsMono/master/fonts/ttf/JetBrainsMono-Regular.ttf"

    try {
        const res = await fetch(fontUrl, { cache: "force-cache" })
        if (res.ok) {
            jetbrainsMono = await res.arrayBuffer()
        }
    } catch (e) {
        console.error("Failed to load JetBrains Mono font:", e)
    }

    return jetbrainsMono || undefined
}

export async function GenerateImage() {
    const fontData = await loadJetBrainsMono()

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#11111b",
                    color: "#cdd6f4",
                    fontFamily: "JetBrains Mono, monospace",
                    padding: "80px",
                    boxSizing: "border-box",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        gap: "32px",
                        maxWidth: "1040px",
                    }}
                >
                    <div
                        style={{
                            fontSize: "16px",
                            color: "#6c7086",
                            letterSpacing: "2px",
                            marginBottom: "16px",
                        }}
                    >
                        #!/usr/bin/env bash
                    </div>
                    <div
                        style={{
                            fontSize: "96px",
                            fontWeight: "bold",
                            color: "#cdd6f4",
                            lineHeight: 1.1,
                            letterSpacing: "-2px",
                        }}
                    >
                        fzf-jj.sh
                    </div>
                    <div
                        style={{
                            fontSize: "28px",
                            color: "#89b4fa",
                            marginTop: "16px",
                            lineHeight: 1.4,
                        }}
                    >
                        Fuzzy Finder for Jujutsu VCS
                    </div>
                    <div
                        style={{
                            display: "flex",
                            gap: "24px",
                            marginTop: "32px",
                            flexWrap: "wrap",
                            justifyContent: "center",
                        }}
                    >
                        <div
                            style={{
                                padding: "12px 24px",
                                background: "#1e1e2e",
                                border: "1px solid #313244",
                                color: "#94e2d5",
                                fontSize: "16px",
                            }}
                        >
                            CTRL-J
                        </div>
                        <div
                            style={{
                                padding: "12px 24px",
                                background: "#1e1e2e",
                                border: "1px solid #313244",
                                color: "#cba6f7",
                                fontSize: "16px",
                            }}
                        >
                            Bookmarks
                        </div>
                        <div
                            style={{
                                padding: "12px 24px",
                                background: "#1e1e2e",
                                border: "1px solid #313244",
                                color: "#f9e2af",
                                fontSize: "16px",
                            }}
                        >
                            Remotes
                        </div>
                        <div
                            style={{
                                padding: "12px 24px",
                                background: "#1e1e2e",
                                border: "1px solid #313244",
                                color: "#fab387",
                                fontSize: "16px",
                            }}
                        >
                            Workspaces
                        </div>
                    </div>
                    <div
                        style={{
                            fontSize: "14px",
                            color: "#6c7086",
                            marginTop: "48px",
                            letterSpacing: "1px",
                        }}
                    >
                        bash + zsh key bindings
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
            fonts: fontData
                ? [
                    {
                        name: "JetBrains Mono",
                        data: fontData,
                        style: "normal" as const,
                        weight: 400 as const,
                    },
                ]
                : [],
        },
    )
}
