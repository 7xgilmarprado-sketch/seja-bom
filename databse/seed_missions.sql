-- --------------------------------------------------------
-- SEED DE 100 MISSÕES DIÁRIAS
-- Execute este script no SQL Editor do Supabase.
-- Ele irá popular o banco com 100 dias de conteúdo.
-- --------------------------------------------------------

INSERT INTO public.daily_missions (title, description, category, xp_reward, active_date)
VALUES
  -- SEMANA 1
  ('Mensagem Inesperada', 'Envie uma mensagem de carinho para alguém com quem você não fala há muito tempo.', 'connection', 50, CURRENT_DATE + 0),
  ('Pausa para Respirar', 'Pare tudo por 2 minutos. Feche os olhos e foque apenas na sua respiração.', 'self-care', 30, CURRENT_DATE + 1),
  ('Gratidão Matinal', 'Assim que acordar, pense em 3 coisas simples pelas quais você é grato hoje.', 'gratitude', 40, CURRENT_DATE + 2),
  ('Gentileza no Trânsito', 'Dê passagem para alguém ou agradeça um motorista/pedestre hoje.', 'kindness', 50, CURRENT_DATE + 3),
  ('Desconexão', 'Fique 1 hora longe das redes sociais antes de dormir para descansar a mente.', 'self-care', 60, CURRENT_DATE + 4),
  ('Elogio ao Serviço', 'Elogie sinceramente o trabalho de um atendente, porteiro ou caixa.', 'kindness', 50, CURRENT_DATE + 5),
  ('Ouvir de Verdade', 'Em uma conversa hoje, escute sem interromper e sem planejar sua resposta enquanto o outro fala.', 'connection', 70, CURRENT_DATE + 6),

  -- SEMANA 2
  ('Hidratação Consciente', 'Beba um copo de água com calma, sentindo a temperatura e agradecendo pela saúde.', 'self-care', 30, CURRENT_DATE + 7),
  ('Sorriso Aberto', 'Sorria para 3 desconhecidos na rua hoje. O sorriso é contagiante.', 'kindness', 40, CURRENT_DATE + 8),
  ('Carta de Gratidão', 'Escreva um bilhete (ou zap) agradecendo alguém que te ajudou recentemente.', 'gratitude', 50, CURRENT_DATE + 9),
  ('Sem Reclamações', 'Tente passar o dia inteiro sem reclamar de situações corriqueiras.', 'self-care', 100, CURRENT_DATE + 10),
  ('Ajuda Doméstica', 'Faça uma tarefa doméstica que não é sua responsabilidade para ajudar quem mora com você.', 'kindness', 60, CURRENT_DATE + 11),
  ('Foto do Céu', 'Tire uma foto do céu e aprecie a beleza da natureza por um momento.', 'gratitude', 30, CURRENT_DATE + 12),
  ('Almoço sem Tela', 'Faça sua refeição principal sem celular ou TV, apenas saboreando a comida.', 'self-care', 50, CURRENT_DATE + 13),

  -- SEMANA 3
  ('Doação Express', 'Separe uma peça de roupa ou objeto que não usa mais para doação.', 'kindness', 80, CURRENT_DATE + 14),
  ('Contato Visual', 'Ao cumprimentar alguém hoje, olhe nos olhos e sorria verdadeiramente.', 'connection', 40, CURRENT_DATE + 15),
  ('Lista de Qualidades', 'Escreva 5 coisas que você admira em si mesmo.', 'self-care', 60, CURRENT_DATE + 16),
  ('Paciência Extra', 'Quando sentir irritação, respire fundo e escolha responder com calma.', 'self-care', 70, CURRENT_DATE + 17),
  ('Feedback Positivo', 'Deixe um comentário positivo em um post que você gostou.', 'kindness', 30, CURRENT_DATE + 18),
  ('Apreciação do Passado', 'Lembre-se de um momento difícil que você superou e agradeça sua própria força.', 'gratitude', 50, CURRENT_DATE + 19),
  ('Pergunta Profunda', 'Pergunte a um amigo "Como você está se sentindo de verdade?" e espere a resposta.', 'connection', 60, CURRENT_DATE + 20),

  -- SEMANA 4
  ('Caminhada Atenta', 'Caminhe por 10 minutos prestando atenção nos sons e cores ao seu redor.', 'self-care', 50, CURRENT_DATE + 21),
  ('Gorjeta Generosa', 'Se puder, dê uma gorjeta acima do esperado ou um troco para alguém.', 'kindness', 50, CURRENT_DATE + 22),
  ('Perdão Silencioso', 'Pense em alguém que te chateou e libere esse peso mentalmente.', 'self-care', 80, CURRENT_DATE + 23),
  ('Reconhecimento Público', 'Elogie alguém na frente de outras pessoas.', 'kindness', 60, CURRENT_DATE + 24),
  ('Sabor da Infância', 'Coma algo que te lembre um momento feliz da infância.', 'gratitude', 40, CURRENT_DATE + 25),
  ('Ligação de Voz', 'Em vez de digitar, ligue para alguém querido apenas para dar oi.', 'connection', 50, CURRENT_DATE + 26),
  ('Limpeza Digital', 'Pare de seguir perfis que te fazem sentir mal ou ansioso.', 'self-care', 40, CURRENT_DATE + 27),

  -- SEMANA 5
  ('Segurar a Porta', 'Segure a porta do elevador ou entrada para alguém passar.', 'kindness', 30, CURRENT_DATE + 28),
  ('Música Favorita', 'Ouça sua música favorita e cante junto, sem vergonha.', 'self-care', 30, CURRENT_DATE + 29),
  ('Agradecer o Básico', 'Agradeça por ter eletricidade, água limpa ou uma cama quente.', 'gratitude', 40, CURRENT_DATE + 30),
  ('Incentivo', 'Diga a alguém que acredita no potencial dela.', 'connection', 50, CURRENT_DATE + 31),
  ('Lixo no Lixo', 'Recolha um papel do chão na rua e jogue na lixeira, mesmo que não seja seu.', 'kindness', 60, CURRENT_DATE + 32),
  ('Postura Poderosa', 'Fique em uma postura confiante por 2 minutos para melhorar seu humor.', 'self-care', 30, CURRENT_DATE + 33),
  ('Lembrança Boa', 'Envie uma foto antiga para um amigo lembrando aquele momento.', 'connection', 40, CURRENT_DATE + 34),

  -- SEMANA 6
  ('Café Pendente', 'Se possível, pague um café para alguém ou doe um valor simbólico.', 'kindness', 50, CURRENT_DATE + 35),
  ('Alongamento', 'Faça 5 minutos de alongamento para soltar o corpo.', 'self-care', 40, CURRENT_DATE + 36),
  ('Gratidão pelo Corpo', 'Agradeça suas pernas por te levarem ou suas mãos por criarem coisas.', 'gratitude', 50, CURRENT_DATE + 37),
  ('Convite para Sair', 'Convide alguém para uma caminhada ou café, sem motivo especial.', 'connection', 60, CURRENT_DATE + 38),
  ('Review Positivo', 'Avalie bem um estabelecimento local no Google Maps ou iFood.', 'kindness', 40, CURRENT_DATE + 39),
  ('Banho Relaxante', 'Tome um banho focado apenas na sensação da água, sem pressa.', 'self-care', 40, CURRENT_DATE + 40),
  ('Bom Dia Animado', 'Dê um "Bom Dia" com energia para a primeira pessoa que ver.', 'connection', 30, CURRENT_DATE + 41),

  -- SEMANA 7
  ('Plantas e Natureza', 'Cuide de uma planta ou abrace uma árvore (sério, faz bem!).', 'connection', 40, CURRENT_DATE + 42),
  ('Silêncio Absoluto', 'Fique 5 minutos em silêncio total, apenas observando seus pensamentos.', 'self-care', 50, CURRENT_DATE + 43),
  ('Elogio Intelectual', 'Elogie uma ideia ou a inteligência de alguém, não a aparência.', 'kindness', 50, CURRENT_DATE + 44),
  ('Gratidão pelo Erro', 'Pense em um erro passado que te ensinou uma lição valiosa.', 'gratitude', 60, CURRENT_DATE + 45),
  ('Sem Julgamentos', 'Ao ver alguém diferente, substitua o julgamento pela curiosidade.', 'kindness', 70, CURRENT_DATE + 46),
  ('Dormir Cedo', 'Vá para a cama 30 minutos mais cedo que o habitual.', 'self-care', 50, CURRENT_DATE + 47),
  ('Compartilhar Conhecimento', 'Ensine algo simples e útil para alguém hoje.', 'connection', 60, CURRENT_DATE + 48),

  -- SEMANA 8
  ('Beleza Oculta', 'Encontre beleza em algo comum: uma sombra, uma textura, uma cor.', 'gratitude', 30, CURRENT_DATE + 49),
  ('Ceder o Lugar', 'Ofereça seu lugar ou vez na fila para alguém que pareça precisar mais.', 'kindness', 50, CURRENT_DATE + 50),
  ('Auto-abraço', 'Dê um abraço em si mesmo e diga "eu estou fazendo o meu melhor".', 'self-care', 40, CURRENT_DATE + 51),
  ('Reconectar', 'Mande mensagem para aquele parente distante apenas para saber como está.', 'connection', 50, CURRENT_DATE + 52),
  ('Doar Livros', 'Coloque um livro lido em uma caixa de doação ou empreste a um amigo.', 'kindness', 60, CURRENT_DATE + 53),
  ('Foco Único', 'Faça uma tarefa do trabalho/estudo por vez, sem multitarefa.', 'self-care', 50, CURRENT_DATE + 54),
  ('Agradecer a Tecnologia', 'Agradeça mentalmente por ter acesso a tanta informação fácil.', 'gratitude', 30, CURRENT_DATE + 55),

  -- SEMANA 9
  ('Ouvir os Pássaros', 'Pare para ouvir o canto dos pássaros ou sons da cidade com atenção.', 'connection', 30, CURRENT_DATE + 56),
  ('Validação', 'Diga a alguém: "Entendo como você se sente, é válido".', 'connection', 60, CURRENT_DATE + 57),
  ('Comer Fruta', 'Coma uma fruta fresca como se fosse a sobremesa mais cara do mundo.', 'self-care', 40, CURRENT_DATE + 58),
  ('Segurar Elevador', 'Segure a porta do elevador para alguém que está correndo.', 'kindness', 30, CURRENT_DATE + 59),
  ('Gratidão pelo Lar', 'Arrume sua cama com carinho, agradecendo pelo seu descanso.', 'gratitude', 40, CURRENT_DATE + 60),
  ('Sem Fofoca', 'Se o assunto virar fofoca, mude o tema ou fique em silêncio.', 'kindness', 70, CURRENT_DATE + 61),
  ('Massagem nos Pés', 'Faça uma automassagem rápida nos seus pés antes de dormir.', 'self-care', 50, CURRENT_DATE + 62),

  -- SEMANA 10
  ('Cumprimentar Segurança', 'Dê um olá simpático ao segurança do mercado ou prédio.', 'connection', 40, CURRENT_DATE + 63),
  ('Ler 5 Páginas', 'Leia 5 páginas de um livro que te inspira.', 'self-care', 50, CURRENT_DATE + 64),
  ('Oferecer Ajuda', 'Pergunte a alguém próximo: "Tem algo que eu possa fazer pra te ajudar hoje?"', 'kindness', 70, CURRENT_DATE + 65),
  ('Agradecer o Sol/Chuva', 'Seja sol ou chuva, agradeça pelo clima e o que ele proporciona.', 'gratitude', 30, CURRENT_DATE + 66),
  ('Olhar nos Olhos', 'Mantenha contato visual gentil enquanto alguém fala com você.', 'connection', 50, CURRENT_DATE + 67),
  ('Definir Limites', 'Diga "não" para algo que você não quer fazer, com educação.', 'self-care', 80, CURRENT_DATE + 68),
  ('Elogiar Roupa', 'Elogie o estilo ou uma peça de roupa de alguém.', 'kindness', 40, CURRENT_DATE + 69),

  -- SEMANA 11
  ('Respiração Profunda', 'Inspire contando até 4, segure 4, expire 4. Repita 3 vezes.', 'self-care', 30, CURRENT_DATE + 70),
  ('Partilhar Lanche', 'Ofereça um pedaço do seu chocolate ou lanche para alguém.', 'kindness', 40, CURRENT_DATE + 71),
  ('Lembrar Aniversário', 'Cheque se é aniversário de alguém e mande parabéns.', 'connection', 50, CURRENT_DATE + 72),
  ('Gratidão Financeira', 'Agradeça pelo dinheiro que você tem, mesmo que queira mais.', 'gratitude', 50, CURRENT_DATE + 73),
  ('Arrumar Bagunça', 'Arrume aquela gaveta ou canto bagunçado que te incomoda.', 'self-care', 60, CURRENT_DATE + 74),
  ('Elogio ao Chefe/Prof', 'Elogie uma atitude do seu líder ou professor.', 'kindness', 60, CURRENT_DATE + 75),
  ('Conversa sem Celular', 'Deixe o celular em outro cômodo enquanto conversa com a família.', 'connection', 70, CURRENT_DATE + 76),

  -- SEMANA 12
  ('Rir de si mesmo', 'Não se leve tão a sério hoje. Ria de um erro bobo.', 'self-care', 50, CURRENT_DATE + 77),
  ('Incentivar Sonho', 'Pergunte sobre o sonho de alguém e incentive-o a continuar.', 'connection', 60, CURRENT_DATE + 78),
  ('Gratidão pela Comida', 'Antes de comer, pense em todo o caminho do alimento até seu prato.', 'gratitude', 40, CURRENT_DATE + 79),
  ('Ajudar Turista/Novato', 'Ajude alguém que parece perdido ou é novo no ambiente.', 'kindness', 60, CURRENT_DATE + 80),
  ('Sesta Curta', 'Se puder, descanse 15 minutos após o almoço. Se não, apenas feche os olhos.', 'self-care', 40, CURRENT_DATE + 81),
  ('Bilhete na Geladeira', 'Deixe um recado carinhoso na geladeira ou espelho de casa.', 'connection', 50, CURRENT_DATE + 82),
  ('Doar Moedas', 'Doe as moedas soltas no bolso para uma causa ou pessoa.', 'kindness', 30, CURRENT_DATE + 83),

  -- SEMANA 13
  ('Ver o Pôr do Sol', 'Tente parar para ver o sol se pondo hoje.', 'gratitude', 40, CURRENT_DATE + 84),
  ('Hidratar a Pele', 'Passe um creme nas mãos ou rosto com atenção plena.', 'self-care', 30, CURRENT_DATE + 85),
  ('Pedir Desculpas', 'Peça desculpas sinceras se errou com alguém recentemente.', 'connection', 80, CURRENT_DATE + 86),
  ('Facilitar para o Outro', 'Deixe algo pronto para facilitar a vida de alguém (café, louça lavada).', 'kindness', 50, CURRENT_DATE + 87),
  ('Gratidão pelo Transporte', 'Agradeça pelo carro, ônibus ou metrô que te leva aos lugares.', 'gratitude', 30, CURRENT_DATE + 88),
  ('Planejar Lazer', 'Planeje algo divertido para o fim de semana.', 'self-care', 40, CURRENT_DATE + 89),
  ('Elogiar a Voz', 'Diga a alguém que você gosta de ouvir a voz/risada dela.', 'connection', 50, CURRENT_DATE + 90),

  -- SEMANA 14
  ('Respeitar a Vez', 'No trânsito ou fila, deixe alguém passar na sua frente sem reclamar.', 'kindness', 50, CURRENT_DATE + 91),
  ('Desjejum Nutritivo', 'Coma algo muito saudável na primeira refeição do dia.', 'self-care', 40, CURRENT_DATE + 92),
  ('Gratidão pela Saúde', 'Agradeça por um órgão do seu corpo que funciona bem (ex: pulmões).', 'gratitude', 40, CURRENT_DATE + 93),
  ('Incluir Alguém', 'Chame para a conversa alguém que está quieto no grupo.', 'connection', 60, CURRENT_DATE + 94),
  ('Não Julgar Aparência', 'Foque apenas nas qualidades internas das pessoas hoje.', 'kindness', 70, CURRENT_DATE + 95),
  ('Meditação Rápida', 'Feche os olhos e conte 10 respirações profundas.', 'self-care', 40, CURRENT_DATE + 96),
  ('Lembrar Conquista', 'Parabenize alguém por uma conquista recente, mesmo pequena.', 'connection', 50, CURRENT_DATE + 97),
  ('Reciclar', 'Certifique-se de separar corretamente o lixo hoje.', 'kindness', 30, CURRENT_DATE + 98),
  ('Auto-gratidão', 'Agradeça a você mesmo por estar tentando ser uma pessoa melhor.', 'gratitude', 100, CURRENT_DATE + 99)

ON CONFLICT (active_date) 
DO UPDATE SET 
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  xp_reward = EXCLUDED.xp_reward;
