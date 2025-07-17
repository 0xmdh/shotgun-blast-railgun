"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Shield,
  Upload,
  Download,
  Wallet,
  Send,
  CheckCircle,
  AlertCircle,
  Clock,
  ExternalLink,
  EyeOff,
  FileText,
  Lock,
  Zap,
  ArrowRight,
  Copy,
  Plus,
  Trash2,
} from "lucide-react"

interface Recipient {
  id: string
  address: string
  amount: string
  token: string
  name?: string
}

interface SafeInfo {
  address: string
  balance: string
  signers: number
  threshold: number
  network: string
}

export default function ShotgunBlastApp() {
  const [currentStep, setCurrentStep] = useState<"connect" | "upload" | "review" | "privacy" | "execute" | "success">(
    "connect",
  )
  const [recipients, setRecipients] = useState<Recipient[]>([])
  const [railgunEnabled, setRailgunEnabled] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingStep, setProcessingStep] = useState(0)
  const [selectedToken, setSelectedToken] = useState("USDC")
  const [connectedSafe, setConnectedSafe] = useState<SafeInfo | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const connectToSafe = () => {
    // Simulate connecting to a Safe
    setConnectedSafe({
      address: "0x1234567890123456789012345678901234567890",
      balance: "127,450",
      signers: 3,
      threshold: 3,
      network: "Ethereum",
    })
    setCurrentStep("upload")
  }

  const handleCSVImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const csv = e.target?.result as string
        const lines = csv.split("\n")
        const newRecipients: Recipient[] = []

        lines.slice(1).forEach((line, index) => {
          const [address, amount, name] = line.split(",")
          if (address && amount) {
            newRecipients.push({
              id: `recipient-${index}`,
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

  const addRecipient = () => {
    const newRecipient: Recipient = {
      id: `recipient-${Date.now()}`,
      address: "",
      amount: "",
      token: selectedToken,
      name: "",
    }
    setRecipients([...recipients, newRecipient])
  }

  const removeRecipient = (id: string) => {
    setRecipients(recipients.filter((r) => r.id !== id))
  }

  const updateRecipient = (id: string, field: keyof Recipient, value: string) => {
    setRecipients(recipients.map((r) => (r.id === id ? { ...r, [field]: value } : r)))
  }

  const totalAmount = recipients.reduce((sum, r) => sum + (Number.parseFloat(r.amount) || 0), 0)

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

  const executeTransaction = async () => {
    setIsProcessing(true)
    setCurrentStep("execute")
    setProcessingStep(0)

    const steps = [
      "Preparing transaction data...",
      "Shielding funds with Railgun...",
      "Creating temporary addresses...",
      "Sending to Safe for approval...",
      "Waiting for Safe signatures...",
      "Executing private transfers...",
    ]

    for (let i = 0; i < steps.length; i++) {
      setProcessingStep(i)
      await new Promise((resolve) => setTimeout(resolve, 2000))
    }

    setIsProcessing(false)
    setCurrentStep("success")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  SHOTGUN BLAST
                </h1>
                <p className="text-sm text-slate-500">Private Corporate Payments powered by RailGun</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {connectedSafe && (
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Safe Connected
                  </Badge>
                  <div className="text-right text-sm">
                    <p className="font-medium">${connectedSafe.balance} USDC</p>
                    <p className="text-slate-500">
                      {connectedSafe.address.slice(0, 6)}...{connectedSafe.address.slice(-4)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8 space-x-4">
          {[
            { key: "connect", label: "Connect Safe", icon: Wallet },
            { key: "upload", label: "Upload CSV", icon: Upload },
            { key: "review", label: "Review", icon: CheckCircle },
            { key: "privacy", label: "Privacy", icon: Shield },
            { key: "execute", label: "Execute", icon: Send },
          ].map((step, index) => {
            const isActive = currentStep === step.key
            const isCompleted =
              ["connect", "upload", "review", "privacy"].indexOf(currentStep) >
              ["connect", "upload", "review", "privacy"].indexOf(step.key)
            const StepIcon = step.icon

            return (
              <div key={step.key} className="flex items-center">
                <div
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                    isActive
                      ? "bg-purple-100 text-purple-700"
                      : isCompleted
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-500"
                  }`}
                >
                  <StepIcon className="w-4 h-4" />
                  <span className="text-sm font-medium">{step.label}</span>
                </div>
                {index < 4 && <ArrowRight className="w-4 h-4 text-gray-400 mx-2" />}
              </div>
            )
          })}
        </div>

        {/* Step 1: Connect to Safe */}
        {currentStep === "connect" && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <Wallet className="w-6 h-6 text-purple-600" />
                Connect Your Gnosis Safe
              </CardTitle>
              <CardDescription>
                SHOTGUN BLAST integrates with your existing Gnosis Safe to add privacy to batch payments
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium">How it works:</h3>
                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-start gap-2">
                      <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-medium text-xs">
                        1
                      </div>
                      <p>Connect to your existing Gnosis Safe multisig</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-medium text-xs">
                        2
                      </div>
                      <p>Upload CSV with recipient addresses and amounts</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-medium text-xs">
                        3
                      </div>
                      <p>Enable RailGun privacy (optional)</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-medium text-xs">
                        4
                      </div>
                      <p>Safe signers approve the transaction</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-medium text-xs">
                        5
                      </div>
                      <p>Recipients receive funds privately</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Privacy Benefits:</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <EyeOff className="w-4 h-4 text-purple-600" />
                      <span>Hide company treasury address</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <EyeOff className="w-4 h-4 text-purple-600" />
                      <span>Conceal individual salary amounts</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <EyeOff className="w-4 h-4 text-purple-600" />
                      <span>Anonymize employee relationships</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Lock className="w-4 h-4 text-purple-600" />
                      <span>Zero-knowledge proof technology</span>
                    </div>
                  </div>
                </div>
              </div>

              <Alert className="border-blue-200 bg-blue-50">
                <AlertCircle className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800">
                  <strong>Safe Integration:</strong> SHOTGUN BLAST works with your existing Safe setup. No changes to
                  your multisig configuration required.
                </AlertDescription>
              </Alert>

              <Button
                onClick={connectToSafe}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                <Wallet className="w-4 h-4 mr-2" />
                Connect to Gnosis Safe
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Upload CSV */}
        {currentStep === "upload" && (
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-600" />
                Upload Payment Recipients
              </CardTitle>
              <CardDescription>Import your payroll data via CSV or add recipients manually</CardDescription>
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
                    <Label>CSV Format</Label>
                    <div className="text-sm text-gray-600 space-y-2">
                      <p>Required columns:</p>
                      <div className="bg-gray-50 p-3 rounded font-mono text-xs">
                        recipient_address,amount,recipient_name
                        <br />
                        0x742d35...,2500,Alice Johnson
                        <br />
                        0x8ba1f1...,3200,Bob Smith
                      </div>
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
                    className="border-2 border-dashed border-purple-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors cursor-pointer bg-purple-50/50"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="w-8 h-8 mx-auto mb-4 text-purple-400" />
                    <p className="text-sm text-gray-600 mb-2">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500">CSV files only</p>
                    <input type="file" accept=".csv" onChange={handleCSVImport} ref={fileInputRef} className="hidden" />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Manual Entry</Label>
                  <Button variant="outline" size="sm" onClick={addRecipient}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Recipient
                  </Button>
                </div>

                {recipients.length > 0 && (
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {recipients.map((recipient) => (
                      <div key={recipient.id} className="flex gap-3 items-center p-3 bg-gray-50 rounded-lg">
                        <Input
                          placeholder="Name (optional)"
                          value={recipient.name}
                          onChange={(e) => updateRecipient(recipient.id, "name", e.target.value)}
                          className="w-32"
                        />
                        <Input
                          placeholder="0x..."
                          value={recipient.address}
                          onChange={(e) => updateRecipient(recipient.id, "address", e.target.value)}
                          className="flex-1 font-mono text-sm"
                        />
                        <Input
                          placeholder="Amount"
                          type="number"
                          value={recipient.amount}
                          onChange={(e) => updateRecipient(recipient.id, "amount", e.target.value)}
                          className="w-24"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeRecipient(recipient.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                {recipients.length > 0 && (
                  <Button onClick={() => setCurrentStep("review")} className="w-full">
                    Review {recipients.length} Recipients
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Review */}
        {currentStep === "review" && (
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-purple-600" />
                Review Payment Details
              </CardTitle>
              <CardDescription>Verify recipients and amounts before proceeding to privacy settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-4 gap-4 p-4 bg-purple-50 rounded-lg">
                <div>
                  <span className="text-sm text-gray-600">Recipients:</span>
                  <p className="font-semibold text-lg">{recipients.length}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Total Amount:</span>
                  <p className="font-semibold text-lg">${totalAmount.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Token:</span>
                  <p className="font-semibold text-lg">{selectedToken}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Safe Balance:</span>
                  <p className="font-semibold text-lg">${connectedSafe?.balance}</p>
                </div>
              </div>

              <div className="max-h-64 overflow-y-auto space-y-2">
                {recipients.map((recipient, index) => (
                  <div key={recipient.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
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

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setCurrentStep("upload")}>
                  Back to Upload
                </Button>
                <Button onClick={() => setCurrentStep("privacy")} className="flex-1">
                  Continue to Privacy Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Privacy Settings */}
        {currentStep === "privacy" && (
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-600" />
                Privacy Configuration
              </CardTitle>
              <CardDescription>Configure RailGun privacy settings for your batch payment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-purple-900">Enable RailGun Privacy</h3>
                    <p className="text-sm text-purple-700">Shield your transaction through zero-knowledge proofs</p>
                  </div>
                </div>
                <Switch
                  checked={railgunEnabled}
                  onCheckedChange={setRailgunEnabled}
                  className="data-[state=checked]:bg-purple-600"
                />
              </div>

              {railgunEnabled && (
                <div className="space-y-4 p-6 bg-purple-50 rounded-lg border border-purple-200">
                  <h4 className="font-medium text-purple-900">Privacy Features Active:</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <EyeOff className="w-5 h-5 text-purple-600" />
                      <div>
                        <p className="font-medium text-sm">Source Shielding</p>
                        <p className="text-xs text-purple-700">Your Safe address will be hidden</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <EyeOff className="w-5 h-5 text-purple-600" />
                      <div>
                        <p className="font-medium text-sm">Amount Privacy</p>
                        <p className="text-xs text-purple-700">Individual amounts concealed</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <EyeOff className="w-5 h-5 text-purple-600" />
                      <div>
                        <p className="font-medium text-sm">Recipient Anonymity</p>
                        <p className="text-xs text-purple-700">No traceable relationships</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Zap className="w-5 h-5 text-purple-600" />
                      <div>
                        <p className="font-medium text-sm">Zero-Knowledge</p>
                        <p className="text-xs text-purple-700">Cryptographic privacy proofs</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <Alert className={railgunEnabled ? "border-purple-200 bg-purple-50" : "border-yellow-200 bg-yellow-50"}>
                <AlertCircle className={`h-4 w-4 ${railgunEnabled ? "text-purple-600" : "text-yellow-600"}`} />
                <AlertDescription className={railgunEnabled ? "text-purple-800" : "text-yellow-800"}>
                  {railgunEnabled ? (
                    <>
                      <strong>Private Mode:</strong> Recipients will receive funds with no trace to your Safe. The
                      transaction will be processed through RailGun's shielded infrastructure.
                    </>
                  ) : (
                    <>
                      <strong>Standard Mode:</strong> Transaction will be executed as a normal batch transfer. All
                      addresses and amounts will be visible on-chain.
                    </>
                  )}
                </AlertDescription>
              </Alert>

              <div className="grid md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <span className="text-sm text-gray-600">Processing Method:</span>
                  <p className="font-semibold flex items-center gap-2">
                    {railgunEnabled ? (
                      <>
                        <Lock className="w-4 h-4 text-purple-600" />
                        RailGun Private
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-gray-600" />
                        Standard Batch
                      </>
                    )}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Privacy Fee:</span>
                  <p className="font-semibold">{railgunEnabled ? "+$18 ETH" : "$0"}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Total Gas:</span>
                  <p className="font-semibold">{railgunEnabled ? "~$43 ETH" : "~$25 ETH"}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setCurrentStep("review")}>
                  Back to Review
                </Button>
                <Button
                  onClick={executeTransaction}
                  className={`flex-1 ${railgunEnabled ? "bg-purple-600 hover:bg-purple-700" : "bg-blue-600 hover:bg-blue-700"}`}
                >
                  {railgunEnabled ? "Execute Private Payment" : "Execute Standard Payment"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 5: Execution */}
        {currentStep === "execute" && (
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                Processing Payment
              </CardTitle>
              <CardDescription>
                {railgunEnabled ? "Private payment in progress..." : "Standard batch payment in progress..."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {isProcessing ? (
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                    <span className="font-medium text-lg">Processing...</span>
                  </div>
                  <Progress value={(processingStep + 1) * 16.67} className="w-full h-3" />
                  <div className="text-center">
                    <p className="font-medium mb-2">Step {processingStep + 1}/6</p>
                    <p className="text-sm text-gray-600">
                      {
                        [
                          "Preparing transaction data...",
                          "Shielding funds with RailGun...",
                          "Creating temporary addresses...",
                          "Sending to Safe for approval...",
                          "Waiting for Safe signatures...",
                          "Executing private transfers...",
                        ][processingStep]
                      }
                    </p>
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>
        )}

        {/* Step 6: Success */}
        {currentStep === "success" && (
          <Card className="max-w-3xl mx-auto">
            <CardContent className="text-center space-y-6 py-8">
              <CheckCircle className="w-20 h-20 text-green-600 mx-auto" />
              <div>
                <h3 className="text-2xl font-semibold text-green-800 mb-2">Payment Completed Successfully!</h3>
                <p className="text-gray-600 mb-4">
                  {railgunEnabled
                    ? "Your private batch payment has been executed. Recipients cannot trace the source of their funds."
                    : "Your batch payment has been completed successfully."}
                </p>
                <div className="grid md:grid-cols-3 gap-4 p-4 bg-green-50 rounded-lg">
                  <div>
                    <span className="text-sm text-gray-600">Recipients Paid:</span>
                    <p className="font-semibold text-lg">{recipients.length}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Total Amount:</span>
                    <p className="font-semibold text-lg">${totalAmount.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Privacy Level:</span>
                    <p className="font-semibold text-lg">{railgunEnabled ? "Maximum" : "Standard"}</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 justify-center">
                <Button variant="outline">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Transaction
                </Button>
                <Button variant="outline">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Details
                </Button>
                <Button
                  onClick={() => {
                    setCurrentStep("connect")
                    setRecipients([])
                    setConnectedSafe(null)
                  }}
                >
                  New Payment
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
