import { useState } from 'react';
import { X, Edit2, Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

interface WalletAddressPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (address: string) => void;
  currentAddress?: string;
}

export function WalletAddressPopup({ isOpen, onClose, onSubmit, currentAddress }: WalletAddressPopupProps) {
  const [address, setAddress] = useState(currentAddress || '');
  const [isEditing, setIsEditing] = useState(!currentAddress);
  const [isLocked, setIsLocked] = useState(!!currentAddress);
  
  if (!isOpen) return null;
  
  const handleSubmit = () => {
    if (address.length < 10) {
      toast({
        title: "Invalid address",
        description: "Please enter a valid USDC address",
        variant: "destructive"
      });
      return;
    }
    
    setIsLocked(true);
    setIsEditing(false);
    onSubmit(address);
    toast({
      title: "Address saved!",
      description: "Your USDC address has been locked in.",
    });
  };
  
  const handleEdit = () => {
    setIsEditing(true);
    setIsLocked(false);
  };
  
  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    toast({
      title: "Copied!",
      description: "Address copied to clipboard",
    });
  };
  
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="glass-card rounded-2xl p-6 max-w-sm mx-4 w-full animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-title text-foreground">
            Submit USDC Address
          </h3>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-muted/30 transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4">
          Enter your Base wallet address to receive USDC rewards.
        </p>
        
        <div className="relative">
          <Input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="0x..."
            disabled={isLocked && !isEditing}
            className="pr-10 font-mono text-sm"
          />
          {isLocked && !isEditing && (
            <button
              onClick={handleEdit}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-muted/30"
            >
              <Edit2 className="w-4 h-4 text-muted-foreground" />
            </button>
          )}
        </div>
        
        {isLocked && !isEditing && (
          <div className="flex items-center gap-2 mt-2 text-success text-xs">
            <Check className="w-3.5 h-3.5" />
            <span>Address locked in</span>
            <button onClick={handleCopy} className="ml-auto p-1 hover:bg-muted/30 rounded">
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
        
        <div className="flex gap-2 mt-4">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onClose}
          >
            Cancel
          </Button>
          {(!isLocked || isEditing) && (
            <Button
              className="flex-1 bg-primary hover:bg-primary/90"
              onClick={handleSubmit}
              disabled={!address}
            >
              Lock in Address
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
