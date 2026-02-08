import React, { useState, useEffect, useRef } from 'react';
import { AppScreen, FeedPost, User, Mission } from './types';
import { BottomNav } from './components/BottomNav';
import { Button } from './components/Button';
import { Heart, MessageCircle, Share2, Sparkles, CheckCircle, Shield, LogIn, Mail, Lock, Camera, ArrowLeft } from 'lucide-react';
import { getAiEncouragement } from './services/geminiService';
import { supabase } from './services/supabaseClient';

// --- SCREENS ---

const Header = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="pt-12 pb-6 px-6 bg-white sticky top-0 z-40 border-b border-slate-50">
    <h1 className="text-2xl font-black text-slate-800 tracking-tight">{title}</h1>
    {subtitle && <p className="text-slate-500 text-sm mt-1">{subtitle}</p>}
  </div>
);

const AuthScreen: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleAuth = async () => {
    setLoading(true);
    setError('');
    setMessage('');

    try {
      if (isForgotPassword) {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: window.location.origin,
        });
        if (error) throw error;
        setMessage('Verifique seu e-mail para redefinir a senha.');
        setLoading(false);
        return;
      }

      if (isSignUp) {
        if (password !== confirmPassword) {
          throw new Error('As senhas não coincidem.');
        }
        if (password.length < 6) {
          throw new Error('A senha deve ter pelo menos 6 caracteres.');
        }
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        alert('Conta criada! Você já pode entrar.');
        setIsSignUp(false);
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        // App component will detect session change
      }
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro.');
    } finally {
      setLoading(false);
    }
  };

  if (isForgotPassword) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white animate-fade-in">
        <button 
          onClick={() => { setIsForgotPassword(false); setError(''); setMessage(''); }}
          className="absolute top-12 left-6 text-slate-400 hover:text-slate-600 flex items-center gap-2"
        >
          <ArrowLeft size={20} /> Voltar
        </button>

        <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mb-6">
          <Lock className="text-sky-600 w-8 h-8" />
        </div>
        <h1 className="text-2xl font-black text-slate-800 mb-2">Recuperar Senha</h1>
        <p className="text-slate-500 mb-8 text-center max-w-xs">Digite seu e-mail para receber um link de redefinição.</p>

        <div className="w-full max-w-sm space-y-4">
          <div className="relative group">
            <div className="absolute inset-0 bg-slate-50 rounded-2xl border border-slate-200 pointer-events-none" />
            <Mail className="absolute left-4 top-3.5 text-slate-400 w-5 h-5 z-10" />
            <input 
              type="email" 
              placeholder="Seu email cadastrado" 
              className="relative w-full pl-12 pr-4 py-3 bg-transparent border-none outline-none rainbow-input font-bold z-20"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {message && <p className="text-green-500 text-sm text-center">{message}</p>}

          <Button fullWidth onClick={handleAuth} loading={loading}>
            Enviar Link
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white animate-fade-in">
      <div className="w-20 h-20 bg-brand-100 rounded-3xl flex items-center justify-center mb-6 rotate-3">
        <Sparkles className="text-brand-600 w-10 h-10" />
      </div>
      <h1 className="text-3xl font-black text-slate-800 mb-2">MiniMissões</h1>
      <p className="text-slate-500 mb-8 text-center max-w-xs">Pequenas atitudes diárias que mudam o seu mundo.</p>

      <div className="w-full max-w-sm space-y-4">
        {/* Email Input */}
        <div className="relative group">
          <div className="absolute inset-0 bg-slate-50 rounded-2xl border border-slate-200 transition-all group-focus-within:border-brand-500 group-focus-within:ring-1 group-focus-within:ring-brand-500 pointer-events-none" />
          <Mail className="absolute left-4 top-3.5 text-slate-400 w-5 h-5 z-10" />
          <input 
            type="email" 
            placeholder="Seu email" 
            className="relative w-full pl-12 pr-4 py-3 bg-transparent border-none outline-none rainbow-input font-bold z-20"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        {/* Password Input */}
        <div className="relative group">
          <div className="absolute inset-0 bg-slate-50 rounded-2xl border border-slate-200 transition-all group-focus-within:border-brand-500 group-focus-within:ring-1 group-focus-within:ring-brand-500 pointer-events-none" />
          <Lock className="absolute left-4 top-3.5 text-slate-400 w-5 h-5 z-10" />
          <input 
            type="password" 
            placeholder="Sua senha" 
            className="relative w-full pl-12 pr-4 py-3 bg-transparent border-none outline-none rainbow-input font-bold z-20"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        {/* Confirm Password Input (Only Sign Up) */}
        {isSignUp && (
          <div className="relative group animate-fade-in-up">
            <div className="absolute inset-0 bg-slate-50 rounded-2xl border border-slate-200 transition-all group-focus-within:border-brand-500 group-focus-within:ring-1 group-focus-within:ring-brand-500 pointer-events-none" />
            <Lock className="absolute left-4 top-3.5 text-slate-400 w-5 h-5 z-10" />
            <input 
              type="password" 
              placeholder="Repita sua senha" 
              className="relative w-full pl-12 pr-4 py-3 bg-transparent border-none outline-none rainbow-input font-bold z-20"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
          </div>
        )}

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <Button fullWidth onClick={handleAuth} loading={loading}>
          {isSignUp ? 'Criar Conta' : 'Entrar'}
        </Button>

        <div className="flex flex-col items-center gap-3 mt-4">
          <button 
            onClick={() => { setIsSignUp(!isSignUp); setError(''); }}
            className="text-slate-400 text-sm font-bold hover:text-brand-600 transition-colors"
          >
            {isSignUp ? 'Já tem conta? Entrar' : 'Criar nova conta'}
          </button>
          
          {!isSignUp && (
            <button 
              onClick={() => { setIsForgotPassword(true); setError(''); }}
              className="text-slate-400 text-xs hover:text-brand-600 transition-colors"
            >
              Esqueci minha senha
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const HomeScreen: React.FC<{ 
  mission: Mission | null; 
  onStart: () => void; 
  completed: boolean;
  loading: boolean;
}> = ({ mission, onStart, completed, loading }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin w-8 h-8 border-4 border-brand-200 border-t-brand-500 rounded-full"></div>
      </div>
    );
  }

  if (completed) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center animate-fade-in">
        <div className="w-32 h-32 bg-brand-100 rounded-full flex items-center justify-center mb-6 relative">
          <div className="absolute inset-0 bg-brand-200 rounded-full animate-ping opacity-20"></div>
          <Sparkles className="text-brand-600 w-16 h-16" />
        </div>
        <h2 className="text-3xl font-black text-slate-800 mb-2">Missão Cumprida!</h2>
        <p className="text-slate-500 mb-8 max-w-xs">Você espalhou luz hoje.</p>
        
        <div className="bg-white p-6 rounded-3xl shadow-sm w-full border border-slate-100 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Próxima missão</span>
            <span className="text-brand-600 font-bold">Amanhã</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-brand-500 w-full rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!mission) {
    return (
      <div className="px-6 py-20 text-center">
        <p className="text-slate-500">Nenhuma missão disponível para hoje.</p>
      </div>
    );
  }

  return (
    <div className="px-6 pb-32">
      <Header title="Missão de Hoje" subtitle="Pequenos gestos mudam o mundo." />
      
      <div className="mt-4 bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Sparkles size={120} className="text-brand-500" />
        </div>
        
        <span className="inline-block px-3 py-1 bg-brand-50 text-brand-700 text-xs font-bold rounded-full mb-4 uppercase tracking-wider">
          {mission.category}
        </span>
        
        <h2 className="text-3xl font-bold text-slate-800 mb-4 leading-tight">
          {mission.title}
        </h2>
        
        <p className="text-lg text-slate-600 leading-relaxed mb-8">
          {mission.description}
        </p>

        <Button fullWidth onClick={onStart} className="shadow-brand-500/40 shadow-xl translate-y-0 hover:-translate-y-1">
          Marcar como Feito
        </Button>
        
        <div className="mt-6 flex items-center justify-center gap-2 text-slate-400 text-sm">
          <Shield size={14} />
          <span>+ {mission.xp} XP de bondade</span>
        </div>
      </div>

      <div className="mt-8 p-6 bg-sky-50 rounded-2xl border border-sky-100">
        <h3 className="font-bold text-sky-800 mb-2 flex items-center gap-2">
          <span className="text-xl">💡</span> Dica rápida
        </h3>
        <p className="text-sky-700 text-sm">
          Não precisa ser algo grandioso. A autenticidade vale mais que a complexidade.
        </p>
      </div>
    </div>
  );
};

const FeedScreen: React.FC<{ posts: FeedPost[], onReact: (id: string) => void, loading: boolean }> = ({ posts, onReact, loading }) => {
  return (
    <div className="pb-32 bg-slate-50 min-h-screen">
      <Header title="Inspiração" subtitle="O impacto positivo da comunidade hoje." />
      
      {loading ? (
         <div className="flex items-center justify-center pt-20">
           <div className="animate-spin w-8 h-8 border-4 border-slate-200 border-t-slate-400 rounded-full"></div>
         </div>
      ) : (
        <div className="px-4 space-y-4 mt-2">
          {posts.length === 0 && (
            <p className="text-center text-slate-400 py-10">Ainda não há posts hoje. Seja o primeiro!</p>
          )}
          {posts.map((post) => (
            <div key={post.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-3">
                <img src={post.user_avatar} alt={post.user_name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="font-bold text-slate-800 text-sm">{post.user_name}</p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-400"></span>
                    <p className="text-xs text-slate-500">{post.mission_title}</p>
                  </div>
                </div>
                <span className="ml-auto text-xs text-slate-300 font-mono">
                  {new Date(post.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </span>
              </div>
              
              {post.reflection && (
                <p className="text-slate-600 text-sm leading-relaxed mb-4 pl-4 border-l-2 border-slate-100">
                  "{post.reflection}"
                </p>
              )}
              
              <div className="flex items-center gap-4 pt-2 border-t border-slate-50">
                <button 
                  onClick={() => onReact(post.id)}
                  className={`flex items-center gap-2 text-sm font-bold transition-colors ${
                    post.is_reacted_by_me ? 'text-rose-500' : 'text-slate-400 hover:text-rose-500'
                  }`}
                >
                  <Heart size={18} fill={post.is_reacted_by_me ? "currentColor" : "none"} />
                  {post.reactions} <span className="font-normal text-xs">inspirados</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ProfileScreen: React.FC<{ 
  user: User | null, 
  onLogout: () => void,
  onUpdateAvatar: (url: string) => Promise<void>
}> = ({ user, onLogout, onUpdateAvatar }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  if (!user) return <div className="p-10 text-center">Carregando...</div>;

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      if (!event.target.files || event.target.files.length === 0) {
        return; // User cancelled
      }
      
      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      // Use Date.now() for unique filename avoiding complex characters
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        if (uploadError.message.includes("Bucket not found")) {
           throw new Error("Erro de configuração: Bucket 'avatars' não existe.");
        }
        throw uploadError;
      }

      // Get Public URL
      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
      
      if (data) {
        // Await the update function to ensure state reflects change before hiding spinner
        // Add timestamp to force browser cache refresh
        const publicUrlWithTimestamp = `${data.publicUrl}?t=${Date.now()}`;
        await onUpdateAvatar(publicUrlWithTimestamp);
      }
      
    } catch (error: any) {
      console.error(error);
      alert('Erro ao fazer upload: ' + (error.message || 'Tente novamente.'));
    } finally {
      setUploading(false);
      // Reset input so same file can be selected again if needed
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="pb-32 px-6">
      <div className="pt-12 flex flex-col items-center">
        <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
          <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-brand-300 to-sky-300 mb-4 overflow-hidden">
            <img src={user.avatar_url} alt={user.name} className={`w-full h-full rounded-full border-4 border-white object-cover ${uploading ? 'opacity-50' : ''}`} />
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity mb-4">
             <Camera className="text-white w-8 h-8" />
          </div>
          {uploading && (
             <div className="absolute inset-0 flex items-center justify-center mb-4">
               <div className="animate-spin w-8 h-8 border-4 border-white border-t-transparent rounded-full"></div>
             </div>
          )}
        </div>
        
        <input 
          type="file" 
          ref={fileInputRef} 
          hidden 
          accept="image/*"
          onChange={handleFileChange}
        />

        <h2 className="text-2xl font-bold text-slate-800">{user.name}</h2>
        <Button variant="ghost" className="text-xs py-1 px-3 mt-2 h-auto" onClick={onLogout}>Sair</Button>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-8">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center">
          <div className="text-3xl font-black text-orange-500 mb-1">🔥 {user.streak}</div>
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wide">Dias Seguidos</span>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center">
          <div className="text-3xl font-black text-brand-600 mb-1">{user.total_missions}</div>
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wide">Missões Feitas</span>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="font-bold text-slate-800 mb-4">Conquistas</h3>
        <div className="space-y-3">
          <div className={`flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-100 ${user.total_missions >= 5 ? 'opacity-100' : 'opacity-50 grayscale'}`}>
            <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-xl">🌟</div>
            <div>
              <p className="font-bold text-slate-700 text-sm">Primeiros Passos</p>
              <p className="text-xs text-slate-400">Complete 5 missões</p>
            </div>
          </div>
          <div className={`flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-100 ${user.streak >= 3 ? 'opacity-100' : 'opacity-50 grayscale'}`}>
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-xl">🔥</div>
            <div>
              <p className="font-bold text-slate-700 text-sm">Em Chamas</p>
              <p className="text-xs text-slate-400">3 dias seguidos</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---

export default function App() {
  const [session, setSession] = useState<any>(null);
  const [screen, setScreen] = useState<AppScreen>(AppScreen.HOME);
  const [mission, setMission] = useState<Mission | null>(null);
  const [isMissionCompleted, setIsMissionCompleted] = useState(false);
  const [feed, setFeed] = useState<FeedPost[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [reflectionText, setReflectionText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

  // 1. Auth Listener
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // 2. Fetch Data when Session exists
  useEffect(() => {
    if (session?.user) {
      fetchInitialData();
    }
  }, [session]);

  const fetchInitialData = async () => {
    setLoadingData(true);
    try {
      const userId = session.user.id;

      // A. Fetch User Profile
      let { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (profile) {
        setCurrentUser({
          id: profile.id,
          name: profile.username,
          avatar_url: profile.avatar_url,
          streak: profile.streak_count,
          total_missions: profile.total_missions
        });
      }

      // B. Fetch Today's Mission
      // Try fetching today's mission, or fallback to the latest one if none exists for today
      const today = new Date().toISOString().split('T')[0];
      let { data: missions } = await supabase
        .from('daily_missions')
        .select('*')
        .eq('active_date', today);
      
      let currentMission = missions && missions.length > 0 ? missions[0] : null;
      
      if (!currentMission) {
          // Fallback: fetch random one or latest
         const { data: latest } = await supabase.from('daily_missions').select('*').limit(1);
         if (latest && latest.length > 0) currentMission = latest[0];
      }

      if (currentMission) {
        setMission(currentMission);
        
        // Check if completed
        const { data: completion } = await supabase
          .from('completions')
          .select('id')
          .eq('user_id', userId)
          .eq('mission_id', currentMission.id)
          .maybeSingle(); // Use maybeSingle to avoid 406 error if 0 rows
        
        setIsMissionCompleted(!!completion);
      }

      // C. Fetch Feed
      await fetchFeed();

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoadingData(false);
    }
  };

  const fetchFeed = async () => {
    const { data: posts, error } = await supabase
      .from('feed_posts')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(50);

    if (error) {
       console.error(error);
       return;
    }

    // Get user reactions to map 'is_reacted_by_me'
    const { data: myReactions } = await supabase
      .from('reactions')
      .select('completion_id')
      .eq('user_id', session.user.id);

    const reactedIds = new Set(myReactions?.map(r => r.completion_id) || []);

    const formattedPosts: FeedPost[] = posts.map((p: any) => ({
      ...p,
      timestamp: new Date(p.timestamp), // Convert string to Date
      is_reacted_by_me: reactedIds.has(p.id)
    }));

    setFeed(formattedPosts);
  };

  // Helper to change screen via bottom nav
  const handleNavigate = (newScreen: AppScreen) => {
    if (screen === AppScreen.COMPLETE_MISSION && newScreen === AppScreen.HOME) {
      setScreen(AppScreen.HOME);
      return;
    }
    setScreen(newScreen);
    if (newScreen === AppScreen.FEED) {
      fetchFeed(); // Refresh feed on enter
    }
  };

  const handleStartMission = () => {
    setScreen(AppScreen.COMPLETE_MISSION);
  };

  const handleCompleteMission = async () => {
    if (!reflectionText.trim() || !mission) return;
    setIsSubmitting(true);
    
    try {
      // 1. AI Encouragement (optional, don't block if fails)
      const aiFeedback = await getAiEncouragement(reflectionText, mission.title);
      console.log(aiFeedback);

      // 2. Insert Completion
      const { error } = await supabase
        .from('completions')
        .insert({
          user_id: session.user.id,
          mission_id: mission.id,
          reflection_text: reflectionText,
          is_public: true
        });

      if (error) throw error;

      // 3. Update Local State
      setIsMissionCompleted(true);
      setScreen(AppScreen.HOME);
      
      // 4. Update Profile stats (Optimistic update)
      if (currentUser) {
        setCurrentUser({
            ...currentUser,
            total_missions: currentUser.total_missions + 1,
            streak: currentUser.streak + 1 // Simplified logic
        });
        
        // Database trigger or manual update would handle the actual increment in a real app
        // For MVP, lets just update the local view
        await supabase.rpc('increment_mission_stats', { user_id_param: session.user.id });
      }

      await fetchFeed(); // Refresh feed to see own post

    } catch (e: any) {
      console.error(e);
      alert('Erro ao salvar missão: ' + e.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReaction = async (postId: string) => {
    // Optimistic UI update
    const postIndex = feed.findIndex(p => p.id === postId);
    if (postIndex === -1) return;
    
    const post = feed[postIndex];
    const isReacting = !post.is_reacted_by_me;
    
    const newFeed = [...feed];
    newFeed[postIndex] = {
      ...post,
      reactions: isReacting ? post.reactions + 1 : post.reactions - 1,
      is_reacted_by_me: isReacting
    };
    setFeed(newFeed);

    try {
      if (isReacting) {
        await supabase.from('reactions').insert({ user_id: session.user.id, completion_id: postId });
      } else {
        await supabase.from('reactions').delete().match({ user_id: session.user.id, completion_id: postId });
      }
    } catch (e) {
      console.error("Reaction failed", e);
      // Revert if needed
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  const handleAvatarUpdate = async (newUrl: string) => {
    if (!currentUser) return;
    
    // Update Supabase Database
    const { error } = await supabase
      .from('profiles')
      .update({ avatar_url: newUrl })
      .eq('id', currentUser.id);

    if (error) {
      console.error(error);
      alert('Erro ao atualizar perfil.');
      return;
    }

    // Update Local State
    setCurrentUser({
      ...currentUser,
      avatar_url: newUrl
    });
  };

  // --- RENDER ---

  if (!session) {
    return <AuthScreen onLogin={() => {}} />;
  }

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-50 shadow-2xl overflow-hidden relative font-sans text-slate-900">
      
      {screen === AppScreen.HOME && (
        <HomeScreen 
          mission={mission} 
          onStart={handleStartMission} 
          completed={isMissionCompleted} 
          loading={loadingData}
        />
      )}
      
      {screen === AppScreen.FEED && (
        <FeedScreen posts={feed} onReact={handleReaction} loading={loadingData} />
      )}
      
      {screen === AppScreen.PROFILE && (
        <ProfileScreen 
          user={currentUser} 
          onLogout={handleLogout} 
          onUpdateAvatar={handleAvatarUpdate}
        />
      )}

      {/* Complete Mission Modal */}
      {screen === AppScreen.COMPLETE_MISSION && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col animate-fade-in-up">
          <div className="p-6">
            <button 
              onClick={() => setScreen(AppScreen.HOME)}
              className="mb-6 text-slate-400 font-bold text-sm hover:text-slate-600"
            >
              ← Cancelar
            </button>
            
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Como foi?</h2>
            <p className="text-slate-500 mb-6">Compartilhe um pouco da sua experiência. Mantenha positivo e breve.</p>
            
            <textarea
              className="w-full h-40 p-4 bg-slate-50 rounded-2xl border-2 border-slate-100 focus:border-brand-500 focus:ring-0 transition-colors text-lg text-slate-700 resize-none placeholder-slate-300"
              placeholder="Eu senti que..."
              value={reflectionText}
              onChange={(e) => setReflectionText(e.target.value)}
              maxLength={280}
            />
            
            <div className="flex justify-between mt-2 mb-8">
              <span className={`text-xs font-bold ${reflectionText.length > 250 ? 'text-red-500' : 'text-slate-300'}`}>
                {reflectionText.length}/280
              </span>
            </div>

            <Button 
              fullWidth 
              onClick={handleCompleteMission}
              disabled={reflectionText.length < 5}
              loading={isSubmitting}
            >
              Publicar e Concluir
            </Button>
          </div>
        </div>
      )}

      <BottomNav currentScreen={screen === AppScreen.COMPLETE_MISSION ? AppScreen.HOME : screen} onNavigate={handleNavigate} />
    </div>
  );
}