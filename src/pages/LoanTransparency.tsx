import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  ShieldCheck, 
  Link as LinkIcon, 
  Search, 
  CheckCircle2, 
  Layers, 
  FileCode, 
  Clock, 
  ArrowUpRight,
  Sparkles,
  Lock,
  Cpu
} from 'lucide-react';

const LoanTransparency = () => {
  const { toast } = useToast();
  const [ledgerData, setLedgerData] = useState<any>(null);
  const [searchHash, setSearchHash] = useState('');
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    fetchLedger();
  }, []);

  const fetchLedger = async () => {
    try {
      const res = await fetch('/api/blockchain/ledger');
      const data = await res.json();
      if (data.success) {
        setLedgerData(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleVerifyHash = async () => {
    if (!searchHash.trim()) return;
    setVerifying(true);
    try {
      const res = await fetch('/api/blockchain/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ txHash: searchHash })
      });
      const data = await res.json();
      if (data.success) {
        setVerificationResult(data.data);
        toast({
          title: "On-Chain Cryptographic Proof Verified! 🔒",
          description: `Block #${data.data.blockNumber} confirmed on Polygon Mainnet.`,
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8 space-y-8 max-w-7xl">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-purple-950 to-slate-900 text-white p-6 md:p-8 rounded-2xl shadow-xl border border-purple-500/20">
        <div className="max-w-3xl space-y-3">
          <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/40">
            <Lock className="w-3.5 h-3.5 mr-1" /> Web3 Smart Contract Audit Trail
          </Badge>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight">
            Blockchain Loan Transparency Dashboard
          </h1>
          <p className="text-purple-100/80 text-sm md:text-base">
            Every loan milestone release is recorded immutably on-chain. Eliminating middleman corruption, hidden fees, and delayed disbursements.
          </p>
        </div>
      </div>

      {/* Smart Contract Overview Stats */}
      {ledgerData && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-slate-900 text-white border-purple-500/20">
            <CardContent className="p-5">
              <span className="text-xs text-purple-300 font-semibold uppercase">Smart Contract Address</span>
              <p className="text-xs font-mono text-slate-300 truncate my-2">{ledgerData.smartContract.address}</p>
              <Badge variant="outline" className="text-purple-400 border-purple-500/40">
                {ledgerData.smartContract.network}
              </Badge>
            </CardContent>
          </Card>

          <Card className="bg-emerald-950 text-white border-emerald-500/20">
            <CardContent className="p-5">
              <span className="text-xs text-emerald-300 font-semibold uppercase">Total Disbursed On-Chain</span>
              <div className="text-3xl font-extrabold text-emerald-400 my-1">
                {ledgerData.smartContract.totalDisbursedOnChain}
              </div>
              <span className="text-xs text-emerald-200/80">100% Verifiable Public Ledger</span>
            </CardContent>
          </Card>

          <Card className="bg-cyan-950 text-white border-cyan-500/20">
            <CardContent className="p-5">
              <span className="text-xs text-cyan-300 font-semibold uppercase">Active Executed Contracts</span>
              <div className="text-3xl font-extrabold text-cyan-400 my-1">
                {ledgerData.smartContract.activeContractsCount}
              </div>
              <span className="text-xs text-cyan-200/80">Automated Milestone Triggers</span>
            </CardContent>
          </Card>

          <Card className="bg-purple-950 text-white border-purple-500/20">
            <CardContent className="p-5">
              <span className="text-xs text-purple-300 font-semibold uppercase">Security Audit</span>
              <div className="flex items-center gap-1.5 my-2">
                <ShieldCheck className="w-6 h-6 text-purple-400" />
                <span className="font-bold text-sm text-purple-200">OpenZeppelin Audited</span>
              </div>
              <span className="text-xs text-purple-300/80">Zero Hidden Deductions</span>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Hash Verification Tool */}
      <Card className="border-purple-500/20 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Search className="w-5 h-5 text-purple-600" /> Verify Transaction Hash On-Chain
          </CardTitle>
          <CardDescription>
            Enter any transaction hash or loan ID to inspect cryptographic proof of disbursement.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Paste transaction hash (e.g., 0x8f3a9b1c7e4d2...)"
              value={searchHash}
              onChange={(e) => setSearchHash(e.target.value)}
              className="font-mono text-xs"
            />
            <Button onClick={handleVerifyHash} disabled={verifying} className="bg-purple-600 hover:bg-purple-700">
              {verifying ? 'Verifying Proof...' : 'Verify Ledger'}
            </Button>
          </div>

          {verificationResult && (
            <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-xl border border-purple-500/30 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-purple-200 dark:border-purple-800 pb-2">
                <span className="font-bold text-purple-800 dark:text-purple-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Cryptographic Proof Validated
                </span>
                <Badge className="bg-emerald-600 text-white">Block #{verificationResult.blockNumber}</Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-slate-700 dark:text-slate-300">
                <div><strong className="text-slate-900 dark:text-slate-100">Borrower:</strong> {verificationResult.borrowerName}</div>
                <div><strong className="text-slate-900 dark:text-slate-100">Loan ID:</strong> {verificationResult.loanId}</div>
                <div><strong className="text-slate-900 dark:text-slate-100">Disbursed Amount:</strong> {verificationResult.disbursedAmount}</div>
                <div><strong className="text-slate-900 dark:text-slate-100">Milestone Phase:</strong> {verificationResult.milestonePhase}</div>
                <div className="md:col-span-2 truncate"><strong className="text-slate-900 dark:text-slate-100">TX Hash:</strong> {verificationResult.txHash}</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Immutable Transaction History Ledger */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-600" /> Real-Time On-Chain Disbursement Ledger
          </CardTitle>
          <CardDescription>Live timeline of smart contract execution logs for female micro-loan recipients.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {ledgerData?.transactions?.map((tx: any, idx: number) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="font-mono text-xs bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-500/30">
                      Block #{tx.blockNumber}
                    </Badge>
                    <span className="font-bold text-sm text-slate-900 dark:text-slate-100">{tx.borrowerName}</span>
                    <span className="text-xs text-muted-foreground">({tx.loanId})</span>
                  </div>
                  <p className="text-xs text-emerald-600 font-semibold">{tx.milestonePhase}</p>
                  <p className="text-xs font-mono text-slate-500 truncate max-w-lg">TX: {tx.txHash}</p>
                </div>

                <div className="text-right flex flex-col items-end gap-1">
                  <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">{tx.disbursedAmount}</span>
                  <span className="text-xs text-muted-foreground">{new Date(tx.timestamp).toLocaleString()}</span>
                  <Badge className="bg-emerald-600 text-white text-[10px]">
                    <CheckCircle2 className="w-3 h-3 mr-1" /> {tx.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoanTransparency;
