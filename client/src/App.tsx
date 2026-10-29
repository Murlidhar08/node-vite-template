import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Activity,
  CheckCircle2,
  Database,
  RefreshCw,
  Server,
  UserPlus,
  Users,
  XCircle,
} from "lucide-react"
import type { HealthResponse } from "./types/health-response"
import type { User } from "./types/user"
import { getHealth } from "./services/general.service"
import { createUser, getUsers } from "./services/user.service"

export function App() {
  const [health, setHealth] = useState<HealthResponse | null>(null)
  const [healthError, setHealthError] = useState<string | null>(null)
  const [loadingHealth, setLoadingHealth] = useState(true)

  const [users, setUsers] = useState<User[]>([])
  const [usersError, setUsersError] = useState<string | null>(null)
  const [loadingUsers, setLoadingUsers] = useState(false)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const checkHealth = async () => {
    setLoadingHealth(true)
    setHealthError(null)
    try {
      const data = await getHealth()
      setHealth(data)
    } catch (err: unknown) {
      setHealth(null)
      setHealthError(
        err instanceof Error ? err.message : "Failed to connect to backend"
      )
    } finally {
      setLoadingHealth(false)
    }
  }

  const loadUsers = async () => {
    setLoadingUsers(true)
    setUsersError(null)
    try {
      const data = await getUsers()
      setUsers(data)
    } catch (err: unknown) {
      setUsersError(
        err instanceof Error ? err.message : "Failed to fetch users"
      )
    } finally {
      setLoadingUsers(false)
    }
  }

  useEffect(() => {
    checkHealth()
    loadUsers()
  }, [])

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setSubmitting(true)
    setFormError(null)
    try {
      const newUser = await createUser({ email, name: name.trim() || undefined })
      setUsers((prev) => [newUser, ...prev])
      setEmail("")
      setName("")
    } catch (err: unknown) {
      setFormError(
        err instanceof Error ? err.message : "Failed to create user"
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      {/* Header */}
      <header className="border-b bg-card/60 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
              <Server className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg font-semibold tracking-tight">Fullstack Starter</h1>
              <p className="text-xs text-muted-foreground">
                React 19 (Vite) + Node.js (TypeScript) + Prisma
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                checkHealth()
                loadUsers()
              }}
              disabled={loadingHealth}
            >
              <RefreshCw
                className={`mr-2 h-4 w-4 ${loadingHealth ? "animate-spin" : ""}`}
              />
              Refresh Connection
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-5xl space-y-6 px-6 py-8">
        {/* Backend Status Card */}
        <section className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${health?.status === "UP"
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  : "bg-destructive/10 text-destructive"
                  }`}
              >
                {health?.status === "UP" ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  <XCircle className="h-5 w-5" />
                )}
              </div>
              <div>
                <h2 className="text-base font-semibold">Backend Connection</h2>
                <p className="text-xs text-muted-foreground">
                  Proxied through Vite to Express (<code className="font-mono">/api/health</code>)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${health?.status === "UP"
                  ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                  : "bg-destructive/15 text-destructive"
                  }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${health?.status === "UP" ? "bg-emerald-500" : "bg-destructive"
                    }`}
                />
                {loadingHealth
                  ? "Checking..."
                  : health?.status === "UP"
                    ? "Connected (UP)"
                    : "Disconnected"}
              </span>
            </div>
          </div>

          {health && (
            <div className="mt-4 grid grid-cols-2 gap-4 border-t pt-4 text-xs sm:grid-cols-3">
              <div>
                <span className="text-muted-foreground">Uptime:</span>{" "}
                <span className="font-mono font-medium">
                  {Math.floor(health.uptime)}s
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Timestamp:</span>{" "}
                <span className="font-mono font-medium">
                  {new Date(health.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="text-muted-foreground">Target Port:</span>{" "}
                <span className="font-mono font-medium">5000</span>
              </div>
            </div>
          )}

          {healthError && (
            <div className="mt-4 rounded-lg bg-destructive/10 p-3 text-xs text-destructive">
              <strong>Error connecting to backend:</strong> {healthError}
              <p className="mt-1 text-muted-foreground">
                Ensure the server is running with <code className="font-mono text-foreground">npm run dev</code> from root or <code className="font-mono text-foreground">npm run dev --prefix server</code>.
              </p>
            </div>
          )}
        </section>

        {/* Database & API Section */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Create User Form */}
          <section className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-2 border-b pb-4">
              <UserPlus className="h-5 w-5 text-primary" />
              <div>
                <h3 className="text-sm font-semibold">Create User</h3>
                <p className="text-xs text-muted-foreground">
                  POST to <code className="font-mono">/api/users</code> (Prisma Database)
                </p>
              </div>
            </div>

            <form onSubmit={handleCreateUser} className="mt-4 space-y-4">
              <div>
                <label className="text-xs font-medium text-foreground">
                  Name (optional)
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe"
                  className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm shadow-xs outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-foreground">
                  Email address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@example.com"
                  className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm shadow-xs outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              {formError && (
                <p className="text-xs text-destructive">{formError}</p>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={submitting || !email.trim() || health?.status !== "UP"}
              >
                {submitting ? "Saving..." : "Add User to Database"}
              </Button>
            </form>
          </section>

          {/* User List */}
          <section className="flex flex-col rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <h3 className="text-sm font-semibold">Registered Users</h3>
                  <p className="text-xs text-muted-foreground">
                    GET from <code className="font-mono">/api/users</code>
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                {users.length} {users.length === 1 ? "user" : "users"}
              </span>
            </div>

            <div className="mt-4 flex-1 space-y-2 overflow-y-auto max-h-72">
              {loadingUsers ? (
                <div className="py-8 text-center text-xs text-muted-foreground">
                  Loading users...
                </div>
              ) : usersError ? (
                <div className="rounded-lg bg-destructive/10 p-3 text-xs text-destructive">
                  {usersError}
                  <p className="mt-1 text-muted-foreground">
                    Make sure PostgreSQL is running and you have run migrations (<code className="font-mono text-foreground">npm run prisma:migrate</code>).
                  </p>
                </div>
              ) : users.length === 0 ? (
                <div className="py-8 text-center text-xs text-muted-foreground">
                  No users found yet. Add one using the form on the left!
                </div>
              ) : (
                users.map((u) => (
                  <div
                    key={u.id}
                    className="flex items-center justify-between rounded-lg border bg-background/50 p-3 text-xs"
                  >
                    <div>
                      <p className="font-medium text-foreground">
                        {u.name || "Anonymous User"}
                      </p>
                      <p className="font-mono text-muted-foreground">{u.email}</p>
                    </div>
                    <span className="text-[10px] text-muted-foreground">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>

        {/* Info Footer */}
        <div className="flex items-center justify-between rounded-lg border border-dashed p-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            <span>PostgreSQL & Prisma ORM connected via backend services</span>
          </div>
          <div className="flex items-center gap-1 font-mono">
            <Activity className="h-3.5 w-3.5" />
            <span>Vite Proxy: /api &rarr; :5000</span>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
