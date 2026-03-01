import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
    ArrowLeft, 
    Send, 
    Paperclip,
    MoreVertical,
    Phone,
    Video,
    Info,
    Check,
    CheckCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { messageService } from '../../services/message.service';
import { userService } from '../../services/user.service';

interface Message {
    id: string;
    content: string;
    senderId: string;
    createdAt: string;
    isRead: boolean;
    attachments?: string[];
}

interface Conversation {
    id: string;
    participant: {
        id: string;
        name: string;
        avatar?: string;
        isOnline?: boolean;
    };
    lastMessage?: {
        content: string;
        createdAt: string;
    };
    unreadCount: number;
}

export function Conversation() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [conversation, setConversation] = useState<Conversation | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (id) {
            fetchConversation();
            fetchMessages();
            // Mark as read when opening
            markAsRead();
        }
    }, [id]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const fetchConversation = async () => {
        try {
            const conversations = await messageService.getConversations();
            const conv = conversations.find((c: any) => c.id === id);
            if (conv) {
                setConversation({
                    id: conv.id,
                    participant: conv.participant || { id: '', name: 'Unknown' },
                    lastMessage: conv.lastMessage,
                    unreadCount: conv.unreadCount || 0
                });
            }
        } catch (error) {
            console.error('Failed to fetch conversation:', error);
        }
    };

    const fetchMessages = async () => {
        try {
            setLoading(true);
            const response = await messageService.getMessages(id!);
            setMessages(response.messages || []);
        } catch (error) {
            console.error('Failed to fetch messages:', error);
        } finally {
            setLoading(false);
        }
    };

    const markAsRead = async () => {
        try {
            await messageService.markAsRead(id!);
        } catch (error) {
            console.error('Failed to mark as read:', error);
        }
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || sending) return;

        try {
            setSending(true);
            const response = await messageService.sendMessage(id!, newMessage.trim());
            setMessages([...messages, response]);
            setNewMessage('');
        } catch (error) {
            console.error('Failed to send message:', error);
        } finally {
            setSending(false);
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const isToday = date.toDateString() === now.toDateString();
        
        if (isToday) {
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }
        return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    };

    const isOwnMessage = (senderId: string) => senderId === user?.id;

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto bg-white min-h-screen shadow-sm flex flex-col">
                {/* Header */}
                <div className="border-b border-gray-200 px-4 py-3 flex items-center justify-between bg-white sticky top-0 z-10">
                    <div className="flex items-center">
                        <Link 
                            to="/messages"
                            className="mr-3 p-2 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
                        >
                            <ArrowLeft className="w-5 h-5 text-gray-600" />
                        </Link>
                        <div className="relative">
                            <div className="w-10 h-10 bg-brand-100 rounded-full flex items-center justify-center">
                                <span className="text-brand-600 font-semibold">
                                    {conversation?.participant.name.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            {conversation?.participant.isOnline && (
                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                            )}
                        </div>
                        <div className="ml-3">
                            <h2 className="font-semibold text-gray-900">
                                {conversation?.participant.name}
                            </h2>
                            <p className="text-xs text-gray-500">
                                {conversation?.participant.isOnline ? 'Online' : 'Offline'}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <Phone className="w-5 h-5 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <Video className="w-5 h-5 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <Info className="w-5 h-5 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <MoreVertical className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500">No messages yet</p>
                            <p className="text-sm text-gray-400 mt-1">Start the conversation!</p>
                        </div>
                    ) : (
                        messages.map((message, index) => {
                            const own = isOwnMessage(message.senderId);
                            const showAvatar = index === 0 || 
                                messages[index - 1].senderId !== message.senderId;
                            
                            return (
                                <div 
                                    key={message.id}
                                    className={`flex ₹{own ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`flex max-w-[70%] ₹{own ? 'flex-row-reverse' : 'flex-row'}`}>
                                        {/* Avatar */}
                                        {showAvatar && !own && (
                                            <div className="w-8 h-8 bg-brand-100 rounded-full flex items-center justify-center flex-shrink-0 mr-2">
                                                <span className="text-xs text-brand-600 font-semibold">
                                                    {conversation?.participant.name.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                        )}
                                        {!showAvatar && !own && <div className="w-8 mr-2"></div>}
                                        
                                        {/* Message Bubble */}
                                        <div className={`relative px-4 py-2 rounded-2xl ₹{
                                            own 
                                                ? 'bg-brand-500 text-white rounded-br-none' 
                                                : 'bg-gray-100 text-gray-900 rounded-bl-none'
                                        }`}>
                                            <p className="text-sm">{message.content}</p>
                                            <div className={`flex items-center mt-1 text-xs ₹{
                                                own ? 'text-brand-100' : 'text-gray-500'
                                            }`}>
                                                <span>{formatTime(message.createdAt)}</span>
                                                {own && (
                                                    <span className="ml-1">
                                                        {message.isRead ? (
                                                            <CheckCheck className="w-3 h-3" />
                                                        ) : (
                                                            <Check className="w-3 h-3" />
                                                        )}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="border-t border-gray-200 p-4 bg-white">
                    <form onSubmit={handleSendMessage} className="flex items-end space-x-2">
                        <button 
                            type="button"
                            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <Paperclip className="w-5 h-5" />
                        </button>
                        <div className="flex-1">
                            <textarea
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSendMessage(e);
                                    }
                                }}
                                placeholder="Type a message..."
                                rows={1}
                                className="w-full px-4 py-2 bg-gray-100 border-0 rounded-full focus:ring-2 focus:ring-brand-500 focus:bg-white resize-none"
                                style={{ minHeight: '40px', maxHeight: '120px' }}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={!newMessage.trim() || sending}
                            className="p-2 bg-brand-500 text-white rounded-full hover:bg-brand-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
