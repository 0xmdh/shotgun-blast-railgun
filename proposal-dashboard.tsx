"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, Users, DollarSign, Eye, EyeOff, Plus, Trash2, Upload, Download } from "lucide-react"

export default function RailgunProposal() {
  const [recipients, setRecipients] = useState([
    { address: "0x742d35Cc6634C0532925a3b8D4C9db", amount: "2500", token: "USDC" },
    { address: "0x8ba1f109551bD432803012645Hac", amount: "3200", token: "USDC" },
    { address: "0x9f4cdf013e5b765b469681841Hac", amount: "2800", token: "USDC" },
  ])

  const addRecipient = () => {
    setRecipients([...recipients, { address: "", amount: "", token: "USDC" }])
  }

  const removeRecipient = (index: number) => {
    setRecipients(recipients.filter((_, i) => i !== index))
  }

  const totalAmount = recipients.reduce((sum, r) => sum + (Number.parseFloat(r.amount) || 0), 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 py-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              SHOTGUN BLAST
            </h1>
          </div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Private Corporate Payments powered by RailGun - Enabling anonymous batch transfers for enterprise payroll
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-slate-500">
            <Badge variant="outline" className="bg-white">
              by WakeUp Labs
            </Badge>
            <Badge variant="outline" className="bg-white">
              RailGun Integration
            </Badge>
            <Badge variant="outline" className="bg-white">
              Enterprise Solution
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="proposal" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="proposal">📋 Proposal</TabsTrigger>
            <TabsTrigger value="demo">🚀 Live Demo</TabsTrigger>
            <TabsTrigger value="metrics">📊 Impact Metrics</TabsTrigger>
          </TabsList>

          <TabsContent value="proposal" className="space-y-8">
            {/* Proposal Content */}
            <Card className="border-2 border-purple-200 bg-white/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-2xl text-purple-800">SHOTGUN BLAST - Private Corporate Payments</CardTitle>
                <CardDescription className="text-lg">
                  Integrate RailGun SDK to enable anonymous multi-send token transfers for enterprise payroll
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-slate-800">Overview</h3>
                  <p className="text-slate-600 leading-relaxed">
                    WakeUp Labs proposes to develop SHOTGUN BLAST, an open-source enterprise payment solution that
                    leverages RailGun's privacy infrastructure to enable anonymous batch salary transfers. This tool
                    addresses a critical gap in corporate DeFi adoption by providing complete transaction privacy for
                    payroll operations.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-slate-800">Actions</h3>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <p className="font-medium mb-2">Allocate 150K RAIL tokens to WakeUp Labs upon proposal approval</p>
                    <div className="text-sm text-slate-600 space-y-1">
                      <p>
                        <strong>Contract:</strong> 0xe8a8b458bcd1ececc6b6b58f80929b29ccecff40
                      </p>
                      <p>
                        <strong>Recipient:</strong> WakeUp Labs Treasury (0x...)
                      </p>
                      <p>
                        <strong>Amount:</strong> 150,000 RAIL tokens
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-slate-800">Why This Matters</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Users className="w-5 h-5 text-purple-600 mt-1" />
                        <div>
                          <h4 className="font-medium">Enterprise Adoption</h4>
                          <p className="text-sm text-slate-600">
                            First enterprise-focused RailGun implementation, opening corporate DeFi market
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-purple-600 mt-1" />
                        <div>
                          <h4 className="font-medium">Complete Privacy</h4>
                          <p className="text-sm text-slate-600">
                            Protects company treasury, employee salaries, and recipient identities
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <DollarSign className="w-5 h-5 text-purple-600 mt-1" />
                        <div>
                          <h4 className="font-medium">Proven Demand</h4>
                          <p className="text-sm text-slate-600">
                            WakeUp Labs processes $50K+ monthly payroll, validating real-world need
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Eye className="w-5 h-5 text-purple-600 mt-1" />
                        <div>
                          <h4 className="font-medium">SDK Testing</h4>
                          <p className="text-sm text-slate-600">
                            Provides valuable feedback for RailGun SDK development and optimization
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-purple-800 mb-2">Deliverables</h4>
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li>✅ Open-source SHOTGUN BLAST interface with CSV import/export</li>
                    <li>✅ RailGun SDK integration for shielded batch transfers</li>
                    <li>✅ Safe multisig compatibility for enterprise security</li>
                    <li>✅ Cross-chain support with automated token swapping</li>
                    <li>✅ Comprehensive documentation and community tutorials</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="demo" className="space-y-6">
            {/* Demo Interface */}
            <Card className="bg-white/90 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-purple-600" />
                  SHOTGUN BLAST - Private Batch Payments
                </CardTitle>
                <CardDescription>
                  Configure your private payroll distribution through RailGun's shielded infrastructure
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Source Configuration */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <Label className="text-base font-medium">Source Configuration</Label>
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="source-wallet">Source Wallet</Label>
                        <Input
                          id="source-wallet"
                          placeholder="0x742d35Cc6634C0532925a3b8D4C9db..."
                          className="font-mono text-sm"
                        />
                      </div>
                      <div>
                        <Label htmlFor="total-budget">Total Budget</Label>
                        <div className="flex gap-2">
                          <Input id="total-budget" placeholder="50000" type="number" />
                          <Badge variant="outline" className="px-3 py-2">
                            USDC
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-base font-medium">Privacy Settings</Label>
                    <div className="space-y-3 p-4 bg-slate-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Shield Source Address</span>
                        <Badge variant="default" className="bg-green-100 text-green-800">
                          <EyeOff className="w-3 h-3 mr-1" />
                          Enabled
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Hide Individual Amounts</span>
                        <Badge variant="default" className="bg-green-100 text-green-800">
                          <EyeOff className="w-3 h-3 mr-1" />
                          Enabled
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Anonymize Recipients</span>
                        <Badge variant="default" className="bg-green-100 text-green-800">
                          <EyeOff className="w-3 h-3 mr-1" />
                          Enabled
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Recipients List */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-medium">Payment Recipients</Label>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Upload className="w-4 h-4 mr-2" />
                        Import CSV
                      </Button>
                      <Button variant="outline" size="sm" onClick={addRecipient}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Recipient
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {recipients.map((recipient, index) => (
                      <div key={index} className="flex gap-3 items-center p-3 bg-slate-50 rounded-lg">
                        <div className="flex-1">
                          <Input
                            placeholder="Recipient address (0x...)"
                            value={recipient.address}
                            onChange={(e) => {
                              const newRecipients = [...recipients]
                              newRecipients[index].address = e.target.value
                              setRecipients(newRecipients)
                            }}
                            className="font-mono text-sm"
                          />
                        </div>
                        <div className="w-32">
                          <Input
                            placeholder="Amount"
                            type="number"
                            value={recipient.amount}
                            onChange={(e) => {
                              const newRecipients = [...recipients]
                              newRecipients[index].amount = e.target.value
                              setRecipients(newRecipients)
                            }}
                          />
                        </div>
                        <Badge variant="outline" className="px-3 py-2">
                          {recipient.token}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeRecipient(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border border-purple-200">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium text-purple-800">Transaction Summary</h4>
                    <Badge variant="outline" className="bg-white">
                      {recipients.length} Recipients
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-600">Total Amount:</span>
                      <p className="font-semibold">${totalAmount.toLocaleString()} USDC</p>
                    </div>
                    <div>
                      <span className="text-slate-600">Estimated Gas:</span>
                      <p className="font-semibold">~$45 ETH</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    <Shield className="w-4 h-4 mr-2" />
                    Execute Shielded Transfer
                  </Button>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export Config
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="metrics" className="space-y-6">
            {/* Impact Metrics */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-green-800 flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Market Opportunity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-2xl font-bold text-green-800">$50K+</p>
                      <p className="text-sm text-green-600">Monthly payroll volume (WakeUp Labs)</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-800">$2.4B</p>
                      <p className="text-sm text-green-600">Global crypto payroll market size</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-blue-800 flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    User Impact
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-2xl font-bold text-blue-800">25+</p>
                      <p className="text-sm text-blue-600">Employees protected (initial)</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-blue-800">100%</p>
                      <p className="text-sm text-blue-600">Transaction privacy coverage</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-purple-800 flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Technical Value
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-2xl font-bold text-purple-800">First</p>
                      <p className="text-sm text-purple-600">Enterprise RailGun integration</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-purple-800">Open</p>
                      <p className="text-sm text-purple-600">Source community tool</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Timeline */}
            <Card className="bg-white/90 backdrop-blur">
              <CardHeader>
                <CardTitle>Development Timeline</CardTitle>
                <CardDescription>Projected milestones for SHOTGUN BLAST implementation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium">Phase 1: Core Development (Weeks 1-4)</p>
                      <p className="text-sm text-slate-600">RailGun SDK integration, basic UI, CSV import/export</p>
                    </div>
                    <Badge variant="outline" className="bg-white">
                      4 weeks
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium">Phase 2: Enterprise Features (Weeks 5-8)</p>
                      <p className="text-sm text-slate-600">Safe multisig integration, advanced privacy controls</p>
                    </div>
                    <Badge variant="outline" className="bg-white">
                      4 weeks
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium">Phase 3: Cross-chain & Launch (Weeks 9-12)</p>
                      <p className="text-sm text-slate-600">Multi-chain support, documentation, community launch</p>
                    </div>
                    <Badge variant="outline" className="bg-white">
                      4 weeks
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
