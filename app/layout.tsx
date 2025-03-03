import "@/app/globals.css"
import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar"
import {AppSidebar} from "@/components/app-sidebar"
import {ThemeProvider} from "@/components/theme-provider";

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body>
        <body>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <SidebarProvider>
                <AppSidebar/>
                <SidebarInset>
                    {children}
                </SidebarInset>
            </SidebarProvider>
        </ThemeProvider>
        </body>
        </body>
        </html>
    )
}