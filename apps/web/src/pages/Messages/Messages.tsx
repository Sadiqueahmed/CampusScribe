import { useState, useEffect, useRef } from 'react';
import { Send, User as UserIcon, ArrowLeft } from 'lucide-react';
import { messageService, Conversation, Message } from '../../services/message.service';
import { Button } from '../../components/common/Button/Button';

export const Messages = () => {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        loadConversations();
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const loadConversations = async () => {
        try {
            const data = await messageService.getConversations();
            setConversations(data);
        } catch (error) {
            console.error('Failed to load conversations:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const loadMessages = async (conversation: Conversation) => {
        setActiveConversation(conversation);
        try {
            const data = await messageService.getMessages(conversation.id);
            setMessages(data.messages);
            // Mark as read
            await messageService.markAsRead(conversation.id);
            // Update unread count in conversations list
            setConversations(prev => prev.map(c => 
                c.id === conversation.id ? { ...c, unreadCount: 0 } : c
            ));
        } catch (error) {
            console.error('Failed to load messages:', error);
        }
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !activeConversation) return;

        try {
            const sentMessage = await messageService.sendMessage(activeConversation.id, newMessage);
            setMessages(prev => [...prev, sentMessage]);
            setNewMessage('');
            
            // Update last message in conversations list
            setConversations(prev => prev.map(c => 
                c.id === activeConversation.id 
                    ? { ...c, lastMessage: sentMessage, updatedAt: new Date().toISOString() }
                    : c
            ).sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()));
        } catch (error) {
            console.error('Failed to send message:', error);
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Messages</h1>

                <div className="bg-white rounded-lg shadow-sm overflow-hidden" style={{ height: '600px' }}>
                    <div className="grid grid-cols-1 md:grid-cols-3 h-full">
                        {/* Conversations List */}
                        <div className={`border-r border-gray-200 ${activeConversation ? 'hidden md:block' : 'block'}`}>
                            <div className="p-4 border-b border-gray-200">
                                <h2 className="font-semibold text-gray-900">Conversations</h2>
                            </div>
                            <div className="overflow-y-auto h-[calc(100%-60px)]">
                                {conversations.length === 0 ? (
                                    <p className="text-gray-500 text-center py-8">No conversations yet</p>
                                ) : (
                                    conversations.map((conversation) => (
                                        <button
                                            key={conversation.id}
                                            onClick={() => loadMessages(conversation)}
                                            className={`w-full p-4 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 ${
                                                activeConversation?.id === conversation.id ? 'bg-blue-50' : ''
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-brand-100 flex items-center justify-center">
                                                    {conversation.participant.avatar ? (
                                                        <img 
                                                            src={conversation.participant.avatar} 
                                                            alt={conversation.participant.name}
                                                            className="h-10 w-10 rounded-full object-cover"
                                                        />
                                                    ) : (
                                                        <UserIcon className="h-5 w-5 text-brand-600" />
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-medium text-gray-900 truncate">
                                                        {conversation.participant.name}
                                                    </p>
                                                    <p className="text-sm text-gray-500 truncate">
                                                        {conversation.lastMessage?.content || 'No messages yet'}
                                                    </p>
                                                </div>
                                                {conversation.unreadCount > 0 && (
                                                    <span className="bg-brand-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                                        {conversation.unreadCount}
                                                    </span>
                                                )}
                                            </div>
                                        </button>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Messages */}
                        <div className={`md:col-span-2 flex flex-col ${activeConversation ? 'block' : 'hidden md:flex'}`}>
                            {activeConversation ? (
                                <>
                                    {/* Header */}
                                    <div className="p-4 border-b border-gray-200 flex items-center gap-3">
                                        <button
                                            onClick={() => setActiveConversation(null)}
                                            className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
                                        >
                                            <ArrowLeft className="h-5 w-5" />
                                        </button>
                                        <div className="h-10 w-10 rounded-full bg-brand-100 flex items-center justify-center">
                                            {activeConversation.participant.avatar ? (
                                                <img 
                                                    src={activeConversation.participant.avatar} 
                                                    alt={activeConversation.participant.name}
                                                    className="h-10 w-10 rounded-full object-cover"
                                                />
                                            ) : (
                                                <UserIcon className="h-5 w-5 text-brand-600" />
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">{activeConversation.participant.name}</p>
                                        </div>
                                    </div>

                                    {/* Messages */}
                                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                        {messages.map((message) => (
                                            <div
                                                key={message.id}
                                                className={`flex ${message.senderId === activeConversation.participant.id ? 'justify-start' : 'justify-end'}`}
                                            >
                                                <div
                                                    className={`max-w-[70%] rounded-lg px-4 py-2 ${
                                                        message.senderId === activeConversation.participant.id
                                                            ? 'bg-gray-100 text-gray-900'
                                                            : 'bg-brand-500 text-white'
                                                    }`}
                                                >
                                                    <p>{message.content}</p>
                                                    <p className={`text-xs mt-1 ${
                                                        message.senderId === activeConversation.participant.id ? 'text-gray-500' : 'text-blue-100'
                                                    }`}>
                                                        {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                        <div ref={messagesEndRef} />
                                    </div>

                                    {/* Input */}
                                    <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={newMessage}
                                                onChange={(e) => setNewMessage(e.target.value)}
                                                placeholder="Type a message..."
                                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                                            />
                                            <Button type="submit" variant="primary" disabled={!newMessage.trim()}>
                                                <Send className="h-5 w-5" />
                                            </Button>
                                        </div>
                                    </form>
                                </>
                            ) : (
                                <div className="flex-1 flex items-center justify-center text-gray-500">
                                    <p>Select a conversation to start messaging</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
