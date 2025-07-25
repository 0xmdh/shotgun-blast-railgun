"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Shield,
  Users,
  Upload,
  Download,
  Wallet,
  Send,
  Settings,
  CheckCircle,
  AlertCircle,
  Clock,
  ExternalLink,
  EyeOff,
  ArrowRight,
  FileText,
  Lock,
  Unlock,
  Zap,
} from "lucide-react"

interface Recipient {
  address: string
  amount: string
  token: string
  name?: string
}

interface SafeTransaction {
  id: string
  timestamp: Date
  totalAmount: number
  recipientCount: number
  status: "pending_approval" | "approved" | "executed" | "railgun_processing" | "completed"
  approvals: number
  requiredApprovals: number
  txHash?: string
  railgunEnabled: boolean
}

export default function GnosisSafeRailgunApp() {
  const [currentStep, setCurrentStep] = useState<"safe" | "csv" | "review" | "railgun" | "execute">("safe")
  const [recipients, setRecipients] = useState<Recipient[]>([])
  const [railgunEnabled, setRailgunEnabled] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingStep, setProcessingStep] = useState(0)
  const [selectedToken, setSelectedToken] = useState("USDC")

  const [safeTransactions] = useState<SafeTransaction[]>([
    {
      id: "tx1",
      timestamp: new Date(Date.now() - 86400000),
      totalAmount: 8500,
      recipientCount: 3,
      status: "completed",
      approvals: 3,
      requiredApprovals: 3,
      txHash: "0x1234...5678",
      railgunEnabled: true,
    },
    {
      id: "tx2",
      timestamp: new Date(Date.now() - 172800000),
      totalAmount: 12300,
      recipientCount: 5,
      status: "completed",
      approvals: 3,
      requiredApprovals: 3,
      txHash: "0x9abc...def0",
      railgunEnabled: false,
    },
  ])

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleCSVImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const csv = e.target?.result as string
        const lines = csv.split("\n")
        const newRecipients: Recipient[] = []

        lines.slice(1).forEach((line) => {
          const [address, amount, name] = line.split(",")
          if (address && amount) {
            newRecipients.push({
              address: address.trim(),
              amount: amount.trim(),
              token: selectedToken,
              name: name?.trim() || "",
            })
          }
        })

        setRecipients(newRecipients)
        setCurrentStep("review")
      }
      reader.readAsText(file)
    }
  }

  const totalAmount = recipients.reduce((sum, r) => sum + (Number.parseFloat(r.amount) || 0), 0)

  const executeTransaction = async () => {
    setIsProcessing(true)
    setCurrentStep("execute")
    setProcessingStep(0)

    const steps = railgunEnabled
      ? [
          "Collecting Safe signatures...",
          "Initiating Railgun shielding...",
          "Creating temporary addresses...",
          "Processing private transfers...",
          "Confirming on-chain...",
        ]
      : ["Collecting Safe signatures...", "Broadcasting transaction...", "Confirming on-chain..."]

    for (let i = 0; i < steps.length; i++) {
      setProcessingStep(i)
      await new Promise((resolve) => setTimeout(resolve, 2000))
    }

    setIsProcessing(false)
    setCurrentStep("safe")
  }

  const downloadSampleCSV = () => {
    const csvContent = [
      "recipient_address,amount,recipient_name",
      "0x742d35Cc6634C0532925a3b8D4C9db123456789a,2500,Alice Johnson",
      "0x8ba1f109551bD432803012645Hac987654321b,3200,Bob Smith",
      "0x9f4cdf013e5b765b469681841Hac456789012c,2800,Carol Davis",
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "sample-payroll.csv"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Gnosis Safe Header */}
      <div className="border-b bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm"></div>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Gnosis Safe</h1>
                <p className="text-sm text-gray-500">WakeUp Labs Treasury</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                3/3 Signers
              </Badge>
              <div className="text-right">
                <p className="text-sm font-medium">$127,450 USDC</p>
                <p className="text-xs text-gray-500">0x1234...5678</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-sm">
          <span className={currentStep === "safe" ? "font-medium text-green-600" : "text-gray-500"}>
            Safe Dashboard
          </span>
          <ArrowRight className="w-4 h-4 text-gray-400" />
          <span className={currentStep === "csv" ? "font-medium text-green-600" : "text-gray-500"}>CSV Airdrop</span>
          <ArrowRight className="w-4 h-4 text-gray-400" />
          <span className={currentStep === "review" ? "font-medium text-green-600" : "text-gray-500"}>Review</span>
          <ArrowRight className="w-4 h-4 text-gray-400" />
          <span className={currentStep === "railgun" ? "font-medium text-green-600" : "text-gray-500"}>Privacy</span>
          <ArrowRight className="w-4 h-4 text-gray-400" />
          <span className={currentStep === "execute" ? "font-medium text-green-600" : "text-gray-500"}>Execute</span>
        </div>

        {/* Step 1: Safe Dashboard */}
        {currentStep === "safe" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-green-600" />
                  Treasury Dashboard
                </CardTitle>
                <CardDescription>Manage your organization's funds and payments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Available Balances</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">USDC</span>
                        <span className="font-medium">$127,450</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">USDT</span>
                        <span className="font-medium">$45,230</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">ETH</span>
                        <span className="font-medium">12.5 ETH</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Quick Actions</h3>
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        className="w-full justify-start bg-transparent"
                        onClick={() => setCurrentStep("csv")}
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Batch Payments (CSV)
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <Users className="w-4 h-4 mr-2" />
                        Single Transfer
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <Settings className="w-4 h-4 mr-2" />
                        Safe Settings
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Recent Activity</h3>
                    <div className="space-y-2">
                      {safeTransactions.slice(0, 3).map((tx) => (
                        <div key={tx.id} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-gray-600">
                            {tx.totalAmount.toLocaleString()} to {tx.recipientCount} recipients
                          </span>
                          {tx.railgunEnabled && <Shield className="w-3 h-3 text-purple-600" />}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Railgun Integration Notice */}
            <Alert className="border-purple-200 bg-purple-50">
              <Shield className="h-4 w-4 text-purple-600" />
              <AlertDescription className="text-purple-800">
                <strong>New:</strong> SHOTGUN BLAST integration available! Add complete privacy to your batch payments
                using Railgun technology.
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* Step 2: CSV Upload */}
        {currentStep === "csv" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-green-600" />
                CSV Airdrop - Batch Payments
              </CardTitle>
              <CardDescription>Upload a CSV file with recipient addresses and amounts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="token-select">Payment Token</Label>
                    <Select value={selectedToken} onValueChange={setSelectedToken}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USDC">USDC</SelectItem>
                        <SelectItem value="USDT">USDT</SelectItem>
                        <SelectItem value="DAI">DAI</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label>CSV File Format</Label>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>Your CSV should contain the following columns:</p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>
                          <code>recipient_address</code> - Ethereum address
                        </li>
                        <li>
                          <code>amount</code> - Token amount (no decimals)
                        </li>
                        <li>
                          <code>recipient_name</code> - Optional name
                        </li>
                      </ul>
                    </div>
                    <Button variant="outline" size="sm" onClick={downloadSampleCSV}>
                      <Download className="w-4 h-4 mr-2" />
                      Download Sample CSV
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Upload CSV File</Label>
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-400 transition-colors cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="w-8 h-8 mx-auto mb-4 text-gray-400" />
                    <p className="text-sm text-gray-600 mb-2">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500">CSV files only</p>
                    <input type="file" accept=".csv" onChange={handleCSVImport} ref={fileInputRef} className="hidden" />
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setCurrentStep("safe")}>
                  Back to Safe
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Review Transactions */}
        {currentStep === "review" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Review Batch Payment
                </CardTitle>
                <CardDescription>
                  {recipients.length} recipients • {totalAmount.toLocaleString()} {selectedToken} total
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="max-h-64 overflow-y-auto space-y-2">
                  {recipients.map((recipient, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{recipient.name || `Recipient ${index + 1}`}</p>
                        <p className="text-xs text-gray-600 font-mono">{recipient.address}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {recipient.amount} {recipient.token}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4 p-4 bg-green-50 rounded-lg">
                  <div>
                    <span className="text-sm text-gray-600">Total Recipients:</span>
                    <p className="font-semibold">{recipients.length}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Total Amount:</span>
                    <p className="font-semibold">
                      {totalAmount.toLocaleString()} {selectedToken}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Estimated Gas:</span>
                    <p className="font-semibold">~$25 ETH</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Safe Balance:</span>
                    <p className="font-semibold">$127,450 USDC</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setCurrentStep("csv")}>
                    Back to CSV
                  </Button>
                  <Button onClick={() => setCurrentStep("railgun")} className="bg-green-600 hover:bg-green-700">
                    Continue to Privacy Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 4: Railgun Privacy Settings */}
        {currentStep === "railgun" && (
          <div className="space-y-6">
            <Card className="border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-purple-600" />
                  SHOTGUN BLAST - Privacy Enhancement
                </CardTitle>
                <CardDescription>Add complete transaction privacy using Railgun technology</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-purple-900">Enable Private Transfers</h3>
                      <p className="text-sm text-purple-700">
                        Hide source address, amounts, and recipient relationships
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={railgunEnabled}
                    onCheckedChange={setRailgunEnabled}
                    className="data-[state=checked]:bg-purple-600"
                  />
                </div>

                {railgunEnabled && (
                  <div className="space-y-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <h4 className="font-medium text-purple-900">Privacy Features Enabled:</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <EyeOff className="w-4 h-4 text-purple-600" />
                        <span className="text-sm text-purple-800">Source address shielded</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <EyeOff className="w-4 h-4 text-purple-600" />
                        <span className="text-sm text-purple-800">Individual amounts hidden</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <EyeOff className="w-4 h-4 text-purple-600" />
                        <span className="text-sm text-purple-800">Recipient relationships anonymized</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-purple-600" />
                        <span className="text-sm text-purple-800">Zero-knowledge proofs</span>
                      </div>
                    </div>
                  </div>
                )}

                <Alert className={railgunEnabled ? "border-purple-200 bg-purple-50" : "border-yellow-200 bg-yellow-50"}>
                  <AlertCircle className={`h-4 w-4 ${railgunEnabled ? "text-purple-600" : "text-yellow-600"}`} />
                  <AlertDescription className={railgunEnabled ? "text-purple-800" : "text-yellow-800"}>
                    {railgunEnabled ? (
                      <>
                        <strong>Privacy Mode Active:</strong> Your transaction will be processed through Railgun's
                        shielded infrastructure. Recipients will receive funds without any trace to your Safe address.
                      </>
                    ) : (
                      <>
                        <strong>Standard Mode:</strong> Transaction will be executed as a normal batch transfer. All
                        addresses and amounts will be visible on-chain.
                      </>
                    )}
                  </AlertDescription>
                </Alert>

                <div className="grid md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <span className="text-sm text-gray-600">Processing Method:</span>
                    <p className="font-semibold flex items-center gap-2">
                      {railgunEnabled ? (
                        <>
                          <Lock className="w-4 h-4 text-purple-600" />
                          Railgun Private Transfer
                        </>
                      ) : (
                        <>
                          <Unlock className="w-4 h-4 text-gray-600" />
                          Standard Batch Transfer
                        </>
                      )}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Additional Fee:</span>
                    <p className="font-semibold">{railgunEnabled ? "+$15 ETH (Privacy)" : "$0"}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setCurrentStep("review")}>
                    Back to Review
                  </Button>
                  <Button
                    onClick={executeTransaction}
                    className={railgunEnabled ? "bg-purple-600 hover:bg-purple-700" : "bg-green-600 hover:bg-green-700"}
                  >
                    {railgunEnabled ? "Execute Private Transfer" : "Execute Standard Transfer"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 5: Execution */}
        {currentStep === "execute" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                Processing Transaction
              </CardTitle>
              <CardDescription>
                {railgunEnabled ? "Private transfer in progress..." : "Standard batch transfer in progress..."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {isProcessing ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
                    <span className="font-medium">Processing...</span>
                  </div>
                  <Progress value={(processingStep + 1) * (railgunEnabled ? 20 : 33.33)} className="w-full" />
                  <p className="text-sm text-gray-600">
                    Step {processingStep + 1}/{railgunEnabled ? 5 : 3}:{" "}
                    {railgunEnabled
                      ? [
                          "Collecting Safe signatures...",
                          "Initiating Railgun shielding...",
                          "Creating temporary addresses...",
                          "Processing private transfers...",
                          "Confirming on-chain...",
                        ][processingStep]
                      : ["Collecting Safe signatures...", "Broadcasting transaction...", "Confirming on-chain..."][
                          processingStep
                        ]}
                  </p>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <CheckCircle className="w-16 h-16 text-green-600 mx-auto" />
                  <div>
                    <h3 className="text-xl font-semibold text-green-800">Transaction Completed!</h3>
                    <p className="text-gray-600">
                      {railgunEnabled
                        ? "Private transfer executed successfully. Recipients cannot trace the source."
                        : "Batch transfer completed successfully."}
                    </p>
                  </div>
                  <div className="flex gap-3 justify-center">
                    <Button variant="outline">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View on Etherscan
                    </Button>
                    <Button onClick={() => setCurrentStep("safe")}>Return to Safe</Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
