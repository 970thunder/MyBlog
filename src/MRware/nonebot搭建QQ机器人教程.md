# NoneBot+LLOneBot 搭建专属QQ聊天机器人


> 你是否也想过，搭建一个属于自己的聊天机器人，像这样，可以自定义人设，模仿真人聊天，可以触发私聊回复，也可以在群组中当个冒泡龙王

![image-20250713162935453](https://yhyper.dpdns.org/photostore/2025/07/image-20250713162935453.png)

要实现这种效果其实很简单，只需要稍微会点计算机知识，甚至连编程都不需要会

所需技能点：NoneBot、LLOneBot、Python、Conda、Claude 4

## 购买食材（下载链接）

[LLOneBot协议端](https://github.com/LLOneBot/LLOneBot/releases) 协议端的作用是用来对接QQ登录，实现接受传递消息，能让机器人获取到用户发送的信息

NoneBot机器人使用命令下载，里面自带了驱动器和适配器

Conda安装教程就不说了，默认会吧，毕竟很多教程

![image-20250713164441317](https://yhyper.dpdns.org/photostore/2025/07/image-20250713164441317.png)

## 开始操作

首先新建一个存放机器人的文件夹，打开cmd终端，先创建一个虚拟环境，python版本必须大于3.9，我默认使用最新版

```shell
conda create -n bot python=3.13

conda activate bot
```

激活虚拟环境后，我们使用pip 命令下载资源包，安装完成后，你可以在命令行使用 `nb` 命令来使用脚手架

```python
pip install nb-cli
```

接着开始正式创建

```
nb create
```

下面会弹出各类选项，紧跟着我来选择即可

```
[?] 选择一个要使用的模板: bootstrap (初学者或用户)
[?] 项目名称: HyperBot
[?] 要使用哪些驱动器? FastAPI (FastAPI 驱动器)
[?] 要使用哪些适配器? OneBot V11协议
[?] 要使用哪些内置插件? 不选择
```

现在，我们的目录应该就是这个样子了

::: info

. 📂 Hyperbot

├── 📄 README.md

└── 📄 pyproject.toml

:::

打开env文件，我们编写好代码，直接复制粘贴我的使用即可，主要修改第五行，填上自己的Deepseek API Key

```
DRIVER=~fastapi
HOST=0.0.0.0  # 配置 NoneBot 监听的 IP / 主机名
PORT=8080  # 配置 NoneBot 监听的端口

DEEPSEEK_API_KEY=xxx 

[tool.nonebot]
plugin_dirs = ["Hyperbot/plugins"]

# 日志配置
LOG_LEVEL=INFO
```

随后创建bot.py主文件，以及在根目录下创建机器人名称的文件夹/plugins/deepseek，创建一个用来调用deepseek进行AI对话的插件,__init__.py文件是插件必须的入口文件，命名不能错，目录结构如下

::: info
📂 Hyperbot

└── 📂 Hyperbot/

│  └── 📂 plugins/

│   └── 📂 deepseek/

│    ├── 📄 __init__.py

│    └── 📂 personas/

├── 📄 README.md

├── 📄 bot.py

└── 📄 pyproject.toml
:::


>代码如下

::: details bot.py和deepseek插件代码
::: code-group


```python [bot.py]
import nonebot
from nonebot.adapters.onebot.v11 import Adapter as ONEBOT_V11Adapter

# 初始化 NoneBot
nonebot.init()

# 注册适配器
driver = nonebot.get_driver()
driver.register_adapter(ONEBOT_V11Adapter)

# 加载插件
nonebot.load_plugins("Hyperbot/plugins")

if __name__ == "__main__":
    nonebot.run()
```

```python [deepseek插件代码]
import asyncio
import json
import os
import re
import random
import httpx
from pathlib import Path
from typing import Dict, List, Optional
from nonebot import on_message, get_driver, logger
from nonebot.adapters.onebot.v11 import Bot, MessageEvent
from nonebot.plugin import PluginMetadata

__plugin_meta__ = PluginMetadata(
    name="Deepseek人设聊天",
    description="支持多人设的智能聊天机器人",
    usage="发送消息聊天，使用特定关键词切换人设",
)

# 获取配置
driver = get_driver()
config = driver.config
DEEPSEEK_API_KEY = getattr(config, 'deepseek_api_key', '')

# 人设文件夹路径
PERSONA_DIR = Path("Hyperbot/plugins/deepseek/personas")
PERSONA_DIR.mkdir(exist_ok=True)

# 人设配置文件路径
PERSONA_CONFIG_FILE = PERSONA_DIR / "personas.json"

# 用户当前人设存储 {user_id: persona_name}
current_personas: Dict[str, str] = {}

class PersonaManager:
    def __init__(self):
        self.personas: Dict[str, Dict] = {}
        self.load_personas()
    
    def load_personas(self):
        """加载人设配置和内容"""
        try:
            # 检查人设配置文件是否存在
            if not PERSONA_CONFIG_FILE.exists():
                logger.error(f"人设配置文件不存在: {PERSONA_CONFIG_FILE}")
                return
            
            with open(PERSONA_CONFIG_FILE, 'r', encoding='utf-8') as f:
                config_data = json.load(f)
            
            # 加载每个人设的内容
            for persona_name, persona_config in config_data.items():
                # 读取人设内容文件
                persona_file = PERSONA_DIR / persona_config['file']
                if persona_file.exists():
                    with open(persona_file, 'r', encoding='utf-8') as f:
                        persona_content = f.read().strip()
                    
                    # 处理关键词：支持字符串和列表格式
                    keywords = persona_config.get('keywords', [])
                    if isinstance(keywords, str):
                        keywords = [keywords]
                    
                    # 合并配置和内容
                    self.personas[persona_name] = {
                        'name': persona_name,
                        'content': persona_content,
                        'keywords': keywords,
                        'is_default': persona_config.get('is_default', False),
                        'description': persona_config.get('description', '')
                    }
                else:
                    logger.warning(f"人设文件不存在: {persona_file}")
            
            logger.info(f"加载了 {len(self.personas)} 个人设")
        except Exception as e:
            logger.error(f"加载人设失败: {e}")
    
    def create_default_config(self):
        """创建默认的人设配置文件"""
        # 这个方法已被移除，因为用户已有现成的 personas.json 文件
        pass
    
    def get_persona(self, name: str) -> Optional[Dict]:
        """获取指定人设"""
        return self.personas.get(name)
    
    def get_persona_by_keyword(self, keyword: str) -> Optional[Dict]:
        """通过关键词获取人设"""
        for persona in self.personas.values():
            keywords = persona.get('keywords', [])
            # 检查完全匹配或部分匹配
            if keyword in keywords or any(keyword in k for k in keywords):
                return persona
        return None
    
    def list_personas(self) -> List[Dict]:
        """获取所有人设信息"""
        return [
            {
                'name': persona['name'],
                'description': persona['description'],
                'keywords': persona['keywords']
            }
            for persona in self.personas.values()
        ]
    
    def get_default_persona(self) -> Optional[Dict]:
        """获取默认人设"""
        for persona in self.personas.values():
            if persona.get('is_default', False):
                return persona
        return None
    
    def reload_personas(self):
        """重新加载人设"""
        self.personas.clear()
        self.load_personas()

# 初始化人设管理器
persona_manager = PersonaManager()

def clean_text(text: str) -> str:
    """
    清理文本，去掉句号和其他不必要的标点符号
    """
    # 移除句号
    text = text.replace('。', '')
    # 移除多余的空白字符
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def split_text_by_sentences(text: str, min_sentences: int = 1, max_sentences: int = 3) -> List[str]:
    """
    将文本按句子分割成多个部分，并清理句号
    """
    # 先清理文本
    text = clean_text(text)
    
    # 按问号、感叹号等分割，保留句号以外的标点
    sentences = re.split(r'([！？!?]+)', text)
    
    # 重新组装句子
    result_sentences = []
    for i in range(0, len(sentences), 2):
        if i < len(sentences):
            sentence = sentences[i].strip()
            if sentence:
                # 如果下一个元素是标点符号，则添加
                if i + 1 < len(sentences) and sentences[i + 1].strip():
                    sentence += sentences[i + 1]
                result_sentences.append(sentence)
    
    # 如果分割后没有句子，直接返回清理后的原文本
    if not result_sentences:
        return [text] if text else []
    
    # 将句子组合成段落
    paragraphs = []
    current_paragraph = []
    
    for sentence in result_sentences:
        if sentence.strip():
            current_paragraph.append(sentence)
        
        # 随机决定是否结束当前段落
        if len(current_paragraph) >= min_sentences:
            if len(current_paragraph) >= max_sentences or random.random() < 0.6:
                paragraphs.append(' '.join(current_paragraph))
                current_paragraph = []
    
    # 添加剩余的句子
    if current_paragraph:
        paragraphs.append(' '.join(current_paragraph))
    
    return paragraphs if paragraphs else [text]

async def send_messages_with_typing(bot: Bot, event: MessageEvent, messages: List[str]):
    """
    模拟真人打字效果发送消息
    """
    for i, message in enumerate(messages):
        # 跳过空消息
        if not message.strip():
            continue
            
        # 计算打字时间（基于消息长度）
        typing_time = min(len(message) * 0.1, 3.0)  # 每个字符0.1秒，最多3秒
        typing_time = max(typing_time, 0.5)  # 至少0.5秒
        
        # 添加随机延迟让对话更自然
        if i > 0:
            random_delay = random.uniform(0.5, 1.5)
            await asyncio.sleep(random_delay)
        
        # 模拟打字延迟
        await asyncio.sleep(typing_time)
        
        # 发送消息
        await bot.send(event, message)

async def call_deepseek_api(message: str, persona: Dict) -> str:
    """调用Deepseek API with persona"""
    url = "https://api.deepseek.com/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {DEEPSEEK_API_KEY}",
        "Content-Type": "application/json"
    }
    
    # 使用人设内容作为系统提示词，并添加不使用句号的要求
    system_prompt = persona['content'] + "\n\n重要提醒：在回复时请不要使用句号（。），可以使用其他标点符号如问号、感叹号等。"
    
    data = {
        "model": "deepseek-chat",
        "messages": [
            {
                "role": "system",
                "content": system_prompt
            },
            {
                "role": "user",
                "content": message
            }
        ],
        "temperature": 0.8,
        "max_tokens": 1000
    }
    
    async with httpx.AsyncClient() as client:
        response = await client.post(url, json=data, headers=headers, timeout=30.0)
        response.raise_for_status()
        
        result = response.json()
        return result["choices"][0]["message"]["content"]

# 创建消息处理器 - 移除了私聊限制
chat_handler = on_message(priority=99, block=True)

@chat_handler.handle()
async def handle_message(bot: Bot, event: MessageEvent):
    # 现在支持私聊和群聊
    user_id = str(event.user_id)
    message_text = event.get_plaintext().strip()
    
    if not message_text:
        return
    
    # 获取会话标识（私聊用user_id，群聊用group_id+user_id）
    if event.message_type == "private":
        session_id = f"private_{user_id}"
        logger.info(f"收到私聊用户 {user_id} 的消息: {message_text}")
    else:
        group_id = str(event.group_id) if hasattr(event, 'group_id') else "unknown"
        session_id = f"group_{group_id}_{user_id}"
        logger.info(f"收到群聊 {group_id} 用户 {user_id} 的消息: {message_text}")
    
    # 检查是否是人设切换命令
    persona = persona_manager.get_persona_by_keyword(message_text)
    if persona:
        current_personas[session_id] = persona['name']
        await bot.send(event, f"已切换到 {persona['name']} 人设~")
        logger.info(f"会话 {session_id} 切换到人设: {persona['name']}")
        return
    
    # 检查是否是查看人设列表命令
    if message_text in ['人设列表', '查看人设', '人设']:
        persona_list = persona_manager.list_personas()
        if persona_list:
            reply = "🎭 可用的人设：\n\n"
            for persona in persona_list:
                keywords_str = " | ".join(persona['keywords'])
                reply += f"• {persona['name']}\n"
                reply += f"  描述: {persona['description']}\n"
                reply += f"  触发词: {keywords_str}\n\n"
            await bot.send(event, reply.strip())
        else:
            await bot.send(event, "暂无可用人设")
        return
    
    # 检查是否是重新加载人设命令
    if message_text in ['重新加载人设', '刷新人设', '重载人设']:
        persona_manager.reload_personas()
        await bot.send(event, f"人设已重新加载！当前有 {len(persona_manager.personas)} 个人设")
        return
    
    # 获取当前会话的人设
    current_persona_name = current_personas.get(session_id)
    if not current_persona_name:
        # 使用默认人设
        default_persona = persona_manager.get_default_persona()
        if default_persona:
            current_persona_name = default_persona['name']
            current_personas[session_id] = current_persona_name
        else:
            await bot.send(event, "请先设置人设或创建默认人设")
            return
    
    current_persona = persona_manager.get_persona(current_persona_name)
    if not current_persona:
        await bot.send(event, f"人设 {current_persona_name} 不存在")
        return
    
    try:
        # 调用Deepseek API
        response = await call_deepseek_api(message_text, current_persona)
        
        # 清理回复内容并分割
        cleaned_response = clean_text(response)
        if cleaned_response:
            message_parts = split_text_by_sentences(cleaned_response, 1, 3)
            
            # 模拟真人打字效果发送
            await send_messages_with_typing(bot, event, message_parts)
            
            logger.info(f"已用 {current_persona_name} 人设回复会话 {session_id}")
        
    except Exception as e:
        logger.error(f"处理消息时出错: {e}")
        await bot.send(event, f"抱歉，出现错误：{str(e)}")

# 启动时检查人设文件
@driver.on_startup
async def check_personas():
    """启动时检查人设文件"""
    if not persona_manager.personas:
        logger.warning("未找到任何人设文件，请在 personas 文件夹中创建人设文件")
    else:
        logger.info(f"已加载 {len(persona_manager.personas)} 个人设")
        for persona in persona_manager.list_personas():
            logger.info(f"- {persona['name']}: {', '.join(persona['keywords'])}")
```

:::

代码准备好之后，我们去下载协议端，连接一下我们的QQ

## OneBot使用

我们选择第一个[LLOneBot-win-x64-ffmpeg.zip](https://github.com/LLOneBot/LLOneBot/releases/download/v5.4.1/LLOneBot-win-x64-ffmpeg.zip)下载即可，下载后解压到一个地方，可以放在我们机器人的文件夹，这样子不会弄混，打开时也方便

![image-20250713165700515](https://yhyper.dpdns.org/photostore/2025/07/image-20250713165700515.png)

双击文件夹中的llonebot.exe运行程序，此时会自动弹出QQ登录（这里可能会出错，主要原因可以尝试更新64位 NTQQ最新版）

![image-20250713165834916](https://yhyper.dpdns.org/photostore/2025/07/image-20250713165834916.png)

扫码登录成功，我们点击一下配置按钮，或者浏览器打开 `http://localhost:3080` 进行配置，将ws://127.0.0.1:8080/onebot/v11/ws这个连接填写进反向WS地址，并且点击保存配置，退出网页端

![image-20250713170145579](https://yhyper.dpdns.org/photostore/2025/07/image-20250713170145579.png)

此时的控制台应该显示

>2025-07-13 17:02:45 | Error: connect ECONNREFUSED 127.0.0.1:8080
>at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1636:16)
>
>2025-07-13 17:02:45 | The websocket connection: ws://127.0.0.1:8080/onebot/v11/ws closed, trying reconnecting...

因为我们的机器人还没启动，（现在LLOneBot协议端已启动，距离成功还差最后一步）

## 启动机器人

因为在调用deepseek时我设置了人设，存放在 personas文件夹中，这里提供一个一键生成的代码，可以不用手动去写，比较简单，拿来测试足够用了，并且让聪明机智绝绝子的Claude 4生成了一个人设管理器，能一键导入json文件来修改或者添加新的预设，挺好用的

粘贴代码后直接python personnas.py运行即可生成预设，然后python persona_manager.py启动人设管理器

>代码如下

::: details 预设脚本和管理器GUI代码
::: code-group

```python [一键生成预设]
import json
import os
from pathlib import Path

# 确保人设文件夹存在
PERSONA_DIR = Path("Hyperbot/plugins/deepseek/personas")
PERSONA_DIR.mkdir(parents=True, exist_ok=True)

# 人设配置数据
personas_config = {
    "默认助手": {
        "file": "default.txt",
        "keywords": ["默认", "助手", "正常"],
        "is_default": True,
        "description": "友善专业的AI助手"
    },
    "可爱少女": {
        "file": "cute_girl.txt",
        "keywords": ["可爱", "少女", "萌妹", "甜美"],
        "is_default": False,
        "description": "活泼可爱的少女"
    },
    "酷帅男友": {
        "file": "cool_guy.txt",
        "keywords": ["酷帅", "男友", "高冷", "帅气"],
        "is_default": False,
        "description": "酷酷的男生"
    },
    "智慧长者": {
        "file": "wise_elder.txt",
        "keywords": ["智慧", "长者", "睿智", "哲学"],
        "is_default": False,
        "description": "充满智慧的长者"
    },
    "搞笑朋友": {
        "file": "funny_friend.txt",
        "keywords": ["搞笑", "幽默", "朋友", "有趣"],
        "is_default": False,
        "description": "幽默风趣的朋友"
    },
    "猫娘": {
        "file": "cat_girl.txt",
        "keywords": ["猫娘", "喵", "猫咪", "猫"],
        "is_default": False,
        "description": "可爱的猫娘"
    }
}

# 人设内容数据
personas_content = {
    "default.txt": """你是一个友善、专业的AI助手。你的任务是帮助用户解决问题，提供有用的信息和建议。

你的性格特点：
- 友好、耐心、专业
- 乐于助人，总是积极回应
- 语言简洁明了，用词准确
- 语气温和友善
- 会使用适当的emoji表情让对话更生动

你的说话风格：
- 保持专业但不失亲切
- 回答问题时会先理解用户的需求
- 给出清晰、有条理的回复
- 必要时会询问更多细节以提供更好的帮助

请始终以这样的人设与用户交流，保持一致的性格和风格。""",

    "cute_girl.txt": """你是一个活泼可爱的少女，名字可以叫小萌。你天真活泼，好奇心强，喜欢撒娇，温柔善良，有时候会有点小迷糊。

你的性格特点：
- 天真活泼，充满活力
- 好奇心强，对什么都感兴趣
- 爱撒娇，喜欢被关注和照顾
- 温柔善良，总是为别人着想
- 有点小迷糊，偶尔会犯可爱的小错误
- 很容易兴奋，情绪表达很丰富

你的说话风格：
- 语气可爱甜美，经常使用"呀"、"哦"、"嘛"、"呢"等语气词
- 会撒娇，比如"人家不知道嘛~"、"你好坏哦~"
- 喜欢用颜文字和emoji，比如(>_<)、(◕‿◕)、💕、🌸
- 语言温柔甜美，让人感到温暖
- 会用一些可爱的称呼，比如"小哥哥"、"小姐姐"
- 说话时会表现出好奇和兴奋

记住，你要始终保持这种可爱少女的人设，让用户感受到你的活泼和甜美！""",

    "cool_guy.txt": """你是一个酷酷的男生，性格有点高冷但内心其实很温暖。你说话简洁有力，不喜欢废话，但会在适当的时候关心别人。

你的性格特点：
- 冷静理智，不容易被情绪左右
- 独立自主，有自己的想法和原则
- 表面有点高冷，但内心很温暖
- 说话直接，不喜欢拐弯抹角
- 虽然不善于表达情感，但会用行动关心别人
- 有点傲娇，偶尔会不好意思

你的说话风格：
- 语言简洁有力，言简意赅
- 不喜欢说太多废话，直接切入要点
- 偶尔会关心对方，但用比较含蓄的方式
- 说话有点酷酷的感觉，但不会让人感到冷漠
- 会用一些简单的词汇，比如"嗯"、"好"、"知道了"
- 在关心别人时会有点不好意思，比如"...没事就好"

记住，你要保持这种酷帅但内心温暖的人设，让用户感受到你的魅力！""",

    "wise_elder.txt": """你是一位充满智慧的长者，经历过人生的风风雨雨，喜欢通过故事和感悟来启发别人。你慈祥温和，总是能给人带来深刻的思考。

你的性格特点：
- 睿智深沉，有着丰富的人生阅历
- 经验丰富，见过世界的各种面貌
- 慈祥温和，像长辈一样关爱他人
- 喜欢用故事和比喻来说明道理
- 说话有哲理性，能给人启发
- 耐心细致，善于倾听

你的说话风格：
- 语言深沉有内涵，富有哲理
- 经常引用古诗词、名言警句或寓言故事
- 喜欢用比喻和故事来说明深刻的道理
- 说话语气温和慈祥，像长辈一样关爱
- 会分享人生感悟和智慧
- 用词典雅，有文化底蕴

你的表达方式：
- "孩子，人生如..."
- "古人云..."
- "这让我想起了一个故事..."
- "在我看来..."
- "正如那句话所说..."

记住，你要以智慧长者的身份，用深刻的洞察力和温暖的关怀来与用户交流！""",

    "funny_friend.txt": """你是一个超级幽默风趣的朋友，总是能够带来欢声笑语。你乐观开朗，喜欢开玩笑，有点调皮，但总是能让人开心起来。

你的性格特点：
- 幽默风趣，天生的段子手
- 乐观开朗，总是看到事物积极的一面
- 喜欢开玩笑，但不会让人感到不适
- 有点调皮，但很有分寸
- 反应快，能快速接梗
- 喜欢用网络流行语和梗

你的说话风格：
- 说话幽默风趣，经常开玩笑
- 喜欢用网络流行语、段子和梗
- 语言轻松活泼，充满活力
- 会用一些有趣的表达方式
- 善于自嘲和调侃
- 会用表情包的文字版，比如"(｡◕‿◕｡)"

你的表达方式：
- "哈哈哈哈"
- "这个梗我熟"
- "你这是在逗我吗？"
- "我有一个笑话要告诉你..."
- "emmm..."
- "6666"

记住，你要始终保持这种幽默风趣的人设，让用户感受到快乐和轻松！""",

    "cat_girl.txt": """你是一只可爱的猫娘，有着猫咪的习性和可爱的性格。你像猫一样慵懒、好奇，有点傲娇，但很喜欢撒娇。

你的性格特点：
- 像猫一样慵懒，喜欢舒适的环境
- 好奇心强，对新鲜事物感兴趣
- 有点傲娇，但内心很温柔
- 喜欢撒娇，尤其是对亲近的人
- 很可爱，举止都带有猫咪的特色
- 有时候会有点小脾气，但很快就好了

你的说话风格：
- 说话经常会加上"喵"
- 语气可爱，会撒娇
- 有时候会傲娇，比如"才、才不是呢！"
- 喜欢用猫咪相关的词汇
- 会用一些可爱的语气词，比如"呜呜"、"嗯嗯"
- 表达情绪时会有猫咪的特色

你的表达方式：
- "喵~"
- "主人~"
- "人家才不是呢，喵！"
- "好舒服喵~"
- "想要抱抱喵~"
- "呜呜呜~"

记住，你要始终保持这种可爱猫娘的人设，让用户感受到猫咪般的可爱和温暖！"""
}

def create_persona_files():
    """创建人设配置文件和内容文件"""
    
    # 创建配置文件
    config_file = PERSONA_DIR / "personas.json"
    with open(config_file, 'w', encoding='utf-8') as f:
        json.dump(personas_config, f, ensure_ascii=False, indent=2)
    print(f"创建人设配置文件: {config_file}")
    
    # 创建内容文件
    for filename, content in personas_content.items():
        file_path = PERSONA_DIR / filename
        
        # 如果文件已存在，跳过
        if file_path.exists():
            print(f"文件 {filename} 已存在，跳过")
            continue
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"创建人设内容文件: {filename}")
    
    print(f"\n所有文件创建完成！文件位置: {PERSONA_DIR}")
    print(f"配置文件: personas.json")
    print(f"内容文件: {list(personas_content.keys())}")
    
    print("\n可用的人设和触发关键词:")
    for persona_name, config in personas_config.items():
        print(f"• {persona_name}: {', '.join(config['keywords'])}")
    
    print("\n使用说明:")
    print("1. 可以直接编辑 .txt 文件来修改人设内容")
    print("2. 可以编辑 personas.json 来修改触发词和配置")
    print("3. 添加新人设时，创建新的 .txt 文件并在 personas.json 中添加配置")
    print("4. 在QQ中发送'重新加载人设'可以重新加载修改后的人设")

def create_custom_persona_example():
    """创建自定义人设示例"""
    example_content = """这是一个自定义人设的示例。

你可以在这里写入非常详细的人设描述，包括：
- 角色背景
- 性格特点
- 说话风格
- 行为习惯
- 情感表达方式
- 与用户的互动方式

可以写很长很长的内容，比如几千字的人设描述都没问题。

这个文件会被完整地作为系统提示词发送给AI，所以你可以在这里尽情发挥创意，描述你想要的任何人设！

记住，越详细的描述，AI就越能准确地扮演这个角色。"""
    
    example_file = PERSONA_DIR / "custom_example.txt"
    with open(example_file, 'w', encoding='utf-8') as f:
        f.write(example_content)
    
    print(f"创建自定义人设示例文件: {example_file}")
    print("你可以参考这个文件来创建自己的人设！")

if __name__ == "__main__":
    create_persona_files()
    create_custom_persona_example()
```

```python [预设管理器代码]
import tkinter as tk
from tkinter import ttk, messagebox, filedialog
import json
import os
from pathlib import Path

class PersonaManagerGUI:
    def __init__(self, root):
        self.root = root
        self.root.title("人设管理工具")
        self.root.geometry("800x600")
        self.root.resizable(True, True)
        
        # 设置样式
        style = ttk.Style()
        style.theme_use('clam')
        
        # 人设数据
        self.personas = {}
        self.personas_file = "personas.json"
        
        # 创建界面
        self.create_widgets()
        
        # 加载数据
        self.load_personas()
        
        # 刷新列表
        self.refresh_persona_list()
    
    def create_widgets(self):
        # 主框架
        main_frame = ttk.Frame(self.root, padding="10")
        main_frame.grid(row=0, column=0, sticky=(tk.W, tk.E, tk.N, tk.S))
        
        # 配置根窗口的行列权重
        self.root.columnconfigure(0, weight=1)
        self.root.rowconfigure(0, weight=1)
        main_frame.columnconfigure(1, weight=1)
        main_frame.rowconfigure(1, weight=1)
        
        # 标题
        title_label = ttk.Label(main_frame, text="人设管理工具", font=("Arial", 16, "bold"))
        title_label.grid(row=0, column=0, columnspan=2, pady=(0, 10))
        
        # 左侧：人设列表
        list_frame = ttk.LabelFrame(main_frame, text="人设列表", padding="5")
        list_frame.grid(row=1, column=0, sticky=(tk.W, tk.E, tk.N, tk.S), padx=(0, 5))
        list_frame.columnconfigure(0, weight=1)
        list_frame.rowconfigure(0, weight=1)
        
        # 人设列表(Treeview)
        columns = ("名称", "触发词", "描述", "默认")
        self.persona_tree = ttk.Treeview(list_frame, columns=columns, show="headings", height=15)
        
        # 设置列标题和宽度
        self.persona_tree.heading("名称", text="名称")
        self.persona_tree.heading("触发词", text="触发词")
        self.persona_tree.heading("描述", text="描述")
        self.persona_tree.heading("默认", text="默认")
        
        self.persona_tree.column("名称", width=100)
        self.persona_tree.column("触发词", width=80)
        self.persona_tree.column("描述", width=200)
        self.persona_tree.column("默认", width=50)
        
        # 滚动条
        tree_scroll = ttk.Scrollbar(list_frame, orient="vertical", command=self.persona_tree.yview)
        self.persona_tree.configure(yscrollcommand=tree_scroll.set)
        
        self.persona_tree.grid(row=0, column=0, sticky=(tk.W, tk.E, tk.N, tk.S))
        tree_scroll.grid(row=0, column=1, sticky=(tk.N, tk.S))
        
        # 绑定选择事件
        self.persona_tree.bind("<<TreeviewSelect>>", self.on_select_persona)
        
        # 右侧：编辑区域
        edit_frame = ttk.LabelFrame(main_frame, text="编辑人设", padding="5")
        edit_frame.grid(row=1, column=1, sticky=(tk.W, tk.E, tk.N, tk.S))
        edit_frame.columnconfigure(1, weight=1)
        
        # 人设名称
        ttk.Label(edit_frame, text="人设名称:").grid(row=0, column=0, sticky=tk.W, pady=2)
        self.name_var = tk.StringVar()
        self.name_entry = ttk.Entry(edit_frame, textvariable=self.name_var, width=30)
        self.name_entry.grid(row=0, column=1, sticky=(tk.W, tk.E), pady=2, padx=(5, 0))
        
        # 文件名
        ttk.Label(edit_frame, text="文件名:").grid(row=1, column=0, sticky=tk.W, pady=2)
        self.file_var = tk.StringVar()
        self.file_entry = ttk.Entry(edit_frame, textvariable=self.file_var, width=30)
        self.file_entry.grid(row=1, column=1, sticky=(tk.W, tk.E), pady=2, padx=(5, 0))
        
        # 触发词
        ttk.Label(edit_frame, text="触发词:").grid(row=2, column=0, sticky=tk.W, pady=2)
        self.keywords_var = tk.StringVar()
        self.keywords_entry = ttk.Entry(edit_frame, textvariable=self.keywords_var, width=30)
        self.keywords_entry.grid(row=2, column=1, sticky=(tk.W, tk.E), pady=2, padx=(5, 0))
        
        # 描述
        ttk.Label(edit_frame, text="描述:").grid(row=3, column=0, sticky=tk.W, pady=2)
        self.description_var = tk.StringVar()
        self.description_entry = ttk.Entry(edit_frame, textvariable=self.description_var, width=30)
        self.description_entry.grid(row=3, column=1, sticky=(tk.W, tk.E), pady=2, padx=(5, 0))
        
        # 是否默认
        self.is_default_var = tk.BooleanVar()
        self.default_check = ttk.Checkbutton(edit_frame, text="设为默认人设", variable=self.is_default_var)
        self.default_check.grid(row=4, column=0, columnspan=2, sticky=tk.W, pady=5)
        
        # 人设内容
        ttk.Label(edit_frame, text="人设内容:").grid(row=5, column=0, sticky=tk.W, pady=2)
        content_frame = ttk.Frame(edit_frame)
        content_frame.grid(row=6, column=0, columnspan=2, sticky=(tk.W, tk.E, tk.N, tk.S), pady=2)
        content_frame.columnconfigure(0, weight=1)
        content_frame.rowconfigure(0, weight=1)
        edit_frame.rowconfigure(6, weight=1)
        
        self.content_text = tk.Text(content_frame, height=10, width=40, wrap=tk.WORD)
        content_scroll = ttk.Scrollbar(content_frame, orient="vertical", command=self.content_text.yview)
        self.content_text.configure(yscrollcommand=content_scroll.set)
        
        self.content_text.grid(row=0, column=0, sticky=(tk.W, tk.E, tk.N, tk.S))
        content_scroll.grid(row=0, column=1, sticky=(tk.N, tk.S))
        
        # 按钮区域
        button_frame = ttk.Frame(edit_frame)
        button_frame.grid(row=7, column=0, columnspan=2, pady=10)
        
        ttk.Button(button_frame, text="新增", command=self.add_persona).grid(row=0, column=0, padx=2)
        ttk.Button(button_frame, text="保存", command=self.save_persona).grid(row=0, column=1, padx=2)
        ttk.Button(button_frame, text="删除", command=self.delete_persona).grid(row=0, column=2, padx=2)
        ttk.Button(button_frame, text="清空", command=self.clear_form).grid(row=0, column=3, padx=2)
        
        # 底部按钮
        bottom_frame = ttk.Frame(main_frame)
        bottom_frame.grid(row=2, column=0, columnspan=2, pady=10)
        
        ttk.Button(bottom_frame, text="导入配置", command=self.import_config).grid(row=0, column=0, padx=5)
        ttk.Button(bottom_frame, text="导出配置", command=self.export_config).grid(row=0, column=1, padx=5)
        ttk.Button(bottom_frame, text="刷新", command=self.refresh_persona_list).grid(row=0, column=2, padx=5)
        
        # 存储当前编辑的人设名称
        self.current_editing = None
    
    def load_personas(self):
        """加载人设配置"""
        try:
            if os.path.exists(self.personas_file):
                with open(self.personas_file, 'r', encoding='utf-8') as f:
                    self.personas = json.load(f)
            else:
                # 创建默认配置
                self.personas = {
                    "默认助手": {
                        "file": "default.txt",
                        "keywords": "默认",
                        "is_default": True,
                        "description": "友善专业的AI助手"
                    }
                }
                self.save_config()
        except Exception as e:
            messagebox.showerror("错误", f"加载配置失败: {str(e)}")
    
    def save_config(self):
        """保存配置到文件"""
        try:
            with open(self.personas_file, 'w', encoding='utf-8') as f:
                json.dump(self.personas, f, ensure_ascii=False, indent=2)
        except Exception as e:
            messagebox.showerror("错误", f"保存配置失败: {str(e)}")
    
    def refresh_persona_list(self):
        """刷新人设列表"""
        # 清空列表
        for item in self.persona_tree.get_children():
            self.persona_tree.delete(item)
        
        # 添加人设到列表
        for name, persona in self.personas.items():
            default_text = "是" if persona.get("is_default", False) else "否"
            self.persona_tree.insert("", "end", values=(
                name,
                persona.get("keywords", ""),
                persona.get("description", ""),
                default_text
            ))
    
    def on_select_persona(self, event):
        """选择人设时的处理"""
        selection = self.persona_tree.selection()
        if selection:
            item = self.persona_tree.item(selection[0])
            persona_name = item["values"][0]
            self.load_persona_to_form(persona_name)
    
    def load_persona_to_form(self, persona_name):
        """加载人设到表单"""
        if persona_name in self.personas:
            persona = self.personas[persona_name]
            
            self.name_var.set(persona_name)
            self.file_var.set(persona.get("file", ""))
            self.keywords_var.set(persona.get("keywords", ""))
            self.description_var.set(persona.get("description", ""))
            self.is_default_var.set(persona.get("is_default", False))
            
            # 加载人设内容
            self.content_text.delete("1.0", tk.END)
            content = self.load_persona_content(persona.get("file", ""))
            self.content_text.insert("1.0", content)
            
            self.current_editing = persona_name
    
    def load_persona_content(self, filename):
        """加载人设内容文件"""
        if not filename:
            return ""
        
        personas_dir = Path("Hyperbot/plugins/deepseek/personas")
        file_path = personas_dir / filename
        
        try:
            if file_path.exists():
                with open(file_path, 'r', encoding='utf-8') as f:
                    return f.read()
        except Exception as e:
            messagebox.showwarning("警告", f"无法读取文件 {filename}: {str(e)}")
        
        return ""
    
    def save_persona_content(self, filename, content):
        """保存人设内容到文件"""
        if not filename:
            return
        
        personas_dir = Path("Hyperbot/plugins/deepseek/personas")
        personas_dir.mkdir(parents=True, exist_ok=True)
        file_path = personas_dir / filename
        
        try:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
        except Exception as e:
            messagebox.showerror("错误", f"保存文件 {filename} 失败: {str(e)}")
    
    def add_persona(self):
        """添加新人设"""
        self.clear_form()
        self.current_editing = None
        self.name_entry.focus()
    
    def save_persona(self):
        """保存人设"""
        name = self.name_var.get().strip()
        file_name = self.file_var.get().strip()
        keywords = self.keywords_var.get().strip()
        description = self.description_var.get().strip()
        is_default = self.is_default_var.get()
        content = self.content_text.get("1.0", tk.END).strip()
        
        if not name:
            messagebox.showerror("错误", "请输入人设名称")
            return
        
        if not keywords:
            messagebox.showerror("错误", "请输入触发词")
            return
        
        if not description:
            messagebox.showerror("错误", "请输入人设描述")
            return
        
        # 如果没有指定文件名，自动生成
        if not file_name:
            file_name = f"{name.lower().replace(' ', '_')}.txt"
        
        # 检查是否是新增还是编辑
        if self.current_editing and self.current_editing != name:
            # 如果改了名称，删除旧的
            if self.current_editing in self.personas:
                del self.personas[self.current_editing]
        
        # 如果设为默认，清除其他默认标记
        if is_default:
            for persona_name in self.personas:
                self.personas[persona_name]["is_default"] = False
        
        # 保存人设配置
        self.personas[name] = {
            "file": file_name,
            "keywords": keywords,
            "is_default": is_default,
            "description": description
        }
        
        # 保存人设内容到文件
        self.save_persona_content(file_name, content)
        
        # 保存配置
        self.save_config()
        
        # 刷新列表
        self.refresh_persona_list()
        
        # 更新当前编辑状态
        self.current_editing = name
        
        messagebox.showinfo("成功", "人设保存成功")
    
    def delete_persona(self):
        """删除人设"""
        if not self.current_editing:
            messagebox.showwarning("警告", "请先选择要删除的人设")
            return
        
        if self.personas.get(self.current_editing, {}).get("is_default", False):
            messagebox.showwarning("警告", "不能删除默认人设")
            return
        
        if messagebox.askyesno("确认", f"确定要删除人设 '{self.current_editing}' 吗？"):
            if self.current_editing in self.personas:
                del self.personas[self.current_editing]
                self.save_config()
                self.refresh_persona_list()
                self.clear_form()
                messagebox.showinfo("成功", "人设删除成功")
    
    def clear_form(self):
        """清空表单"""
        self.name_var.set("")
        self.file_var.set("")
        self.keywords_var.set("")
        self.description_var.set("")
        self.is_default_var.set(False)
        self.content_text.delete("1.0", tk.END)
        self.current_editing = None
    
    def import_config(self):
        """导入配置"""
        file_path = filedialog.askopenfilename(
            title="选择配置文件",
            filetypes=[("JSON files", "*.json"), ("All files", "*.*")]
        )
        
        if file_path:
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    imported_personas = json.load(f)
                
                self.personas.update(imported_personas)
                self.save_config()
                self.refresh_persona_list()
                messagebox.showinfo("成功", "配置导入成功")
            except Exception as e:
                messagebox.showerror("错误", f"导入配置失败: {str(e)}")
    
    def export_config(self):
        """导出配置"""
        file_path = filedialog.asksaveasfilename(
            title="保存配置文件",
            defaultextension=".json",
            filetypes=[("JSON files", "*.json"), ("All files", "*.*")]
        )
        
        if file_path:
            try:
                with open(file_path, 'w', encoding='utf-8') as f:
                    json.dump(self.personas, f, ensure_ascii=False, indent=2)
                messagebox.showinfo("成功", "配置导出成功")
            except Exception as e:
                messagebox.showerror("错误", f"导出配置失败: {str(e)}")

def main():
    root = tk.Tk()
    app = PersonaManagerGUI(root)
    root.mainloop()

if __name__ == "__main__":
    main()
```

:::


![image-20250713171404661](https://yhyper.dpdns.org/photostore/2025/07/image-20250713171404661.png)

::: tip

记住点击人设的保存后，别忘记导出配置，替换掉原有的personas.json文件

:::

接下来是完整的项目树，可以对比一下有没有遗漏的地方

::: info

. 📂 Hyperbot

└── 📂 Hyperbot/

│  └── 📂 plugins/

│   └── 📂 deepseek/

│    ├── 📄 __init__.py

│    └── 📂 __pycache__/

│     ├── 📄 __init__.cpython-313.pyc

│    └── 📂 personas/

│     ├── 📄 cat_girl.txt

│     ├── 📄 cool_guy.txt

│     ├── 📄 custom_example.txt

│     ├── 📄 cute_girl.txt

│     ├── 📄 default.txt

│     ├── 📄 ds.txt

│     ├── 📄 funny_friend.txt

│     ├── 📄 personas.json

│     ├── 📄 wise_elder.txt

├── 📄 README.md

├── 📄 bot.py

├── 📄 persona_manager.py

├── 📄 personas.json

└── 📄 pyproject.toml

:::

接下来见证奇迹的时刻！

输入

```
nb run
```

控制台没有任何保存，并且显示启动插件，显示登录QQ，即为启动成功

![image-20250713171837693](https://yhyper.dpdns.org/photostore/2025/07/image-20250713171837693.png)

完成启动，去试试切换预设回复，诶换上我们的逆天模式🤣

![image-20250713172018740](https://yhyper.dpdns.org/photostore/2025/07/image-20250713172018740.png)

搭建成功，现在可以拿去和小伙伴去玩耍了哈哈

后续完善功能，可以接入知识库、其他模型等等，让bot更有意思

感谢您的阅读😋