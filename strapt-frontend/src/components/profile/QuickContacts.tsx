
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserPlus, Search, ArrowUpRight, Star, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Mock contacts data
const mockContacts = [
  { id: '1', name: 'Sarah Miller', address: '0x1234...5678', username: '@sarah', avatar: '' },
  { id: '2', name: 'Alex Rodriguez', address: '0x9876...5432', username: '@alex_r', avatar: '' },
  { id: '3', name: 'Jamie Smith', address: '0x6543...2109', username: '@jamies', avatar: '' },
  { id: '4', name: 'Taylor Wong', address: '0x8765...4321', username: '@taylor', avatar: '' },
];

const QuickContacts = () => {
  const [contacts, setContacts] = useState(mockContacts);
  const [showAddContact, setShowAddContact] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTransfer = (contactId: string) => {
    // In a real app, this would pre-fill the transfer form with the contact's info
    const contact = contacts.find(c => c.id === contactId);
    if (contact) {
      navigate('/app/transfer', { 
        state: { recipient: contact.address, username: contact.username } 
      });
    }
  };

  const handleAddContact = (event: React.FormEvent) => {
    event.preventDefault();
    // This would actually add the contact in a real app
    setShowAddContact(false);
  };

  return (
    <>
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">Quick Contacts</CardTitle>
            <Button size="sm" variant="outline" onClick={() => setShowAddContact(true)}>
              <UserPlus className="h-4 w-4 mr-1" /> Add
            </Button>
          </div>
          <CardDescription>Quickly send funds to your frequent contacts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search contacts..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="space-y-3">
            {filteredContacts.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">No contacts found</p>
            ) : (
              filteredContacts.map(contact => (
                <div key={contact.id} className="flex items-center justify-between bg-secondary/30 rounded-lg p-3">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={contact.avatar} />
                      <AvatarFallback>{contact.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{contact.name}</p>
                      <p className="text-sm text-muted-foreground">{contact.username}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0" title="Mark as favorite">
                      <Star className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      className="h-8 w-8 p-0"
                      onClick={() => handleTransfer(contact.id)}
                      title="Send funds"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={showAddContact} onOpenChange={setShowAddContact}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Contact</DialogTitle>
            <DialogDescription>
              Add someone to your quick contacts for faster transfers
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddContact}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Contact name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="username">Username or ENS</Label>
                <Input id="username" placeholder="@username or name.eth" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Wallet Address</Label>
                <Input id="address" placeholder="0x..." />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowAddContact(false)}>
                Cancel
              </Button>
              <Button type="submit">Add Contact</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default QuickContacts;
