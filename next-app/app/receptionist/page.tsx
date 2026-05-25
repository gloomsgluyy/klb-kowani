import { ReceptionistDashboard } from "@/components/klb/receptionist-dashboard"
import {
  KlbBatikBackground,
  KlbFooter,
  KlbTopBar,
} from "@/components/klb/klb-shell"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { isValidReceptionistToken } from "@/lib/attendance-types"

type ReceptionistPageProps = {
  searchParams: Promise<{
    token?: string
  }>
}

export default async function ReceptionistPage({
  searchParams,
}: ReceptionistPageProps) {
  const params = await searchParams
  const token = params.token

  if (!isValidReceptionistToken(token)) {
    return (
      <main className="flex min-h-svh flex-col bg-background">
        <KlbTopBar />
        <section className="relative flex flex-1 items-center justify-center overflow-hidden px-4 py-8">
          <KlbBatikBackground />
          <Card className="relative z-10 w-full max-w-md bg-card/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="font-heading text-2xl text-primary">
                Akses Tidak Valid
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Alert variant="destructive">
                <AlertTitle>Link dashboard tidak aktif</AlertTitle>
                <AlertDescription>
                  Link dashboard tidak valid atau sudah tidak aktif.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </section>
        <KlbFooter />
      </main>
    )
  }

  return <ReceptionistDashboard token={token as string} />
}
