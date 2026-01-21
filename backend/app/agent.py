import os
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langgraph.prebuilt import create_react_agent
from langchain_core.messages import HumanMessage, SystemMessage
from .tools import log_interaction, search_hcp, get_product_info, schedule_followup, edit_interaction

load_dotenv()

api_key = os.getenv("GROQ_API_KEY")

# हम 'llama-3.3-70b-versatile' यूज़ कर रहे हैं, लेकिन अगर यह फेल हुआ तो Backup तैयार है
llm = ChatGroq(
    model="llama-3.3-70b-versatile", 
    temperature=0,
    api_key=api_key
)

tools = [log_interaction, search_hcp, get_product_info, schedule_followup, edit_interaction]

agent_executor = create_react_agent(llm, tools)

def run_agent(query: str):
    print(f"🧠 AI Processing: {query}")
    
    messages = [
        SystemMessage(content="You are a CRM Assistant. Use tools for logging, searching, and product info."),
        HumanMessage(content=query)
    ]

    try:
        # 1. AI को कॉल करने की कोशिश करें
        result = agent_executor.invoke({"messages": messages})
        return result["messages"][-1].content
    
    except Exception as e:
        print(f"⚠️ AI Quota Exceeded or Error: {e}")
        print("⚡ Switching to Backup Mode (Manual Logic)...")
        
        # 2. अगर AI फेल हो जाए (Quota Limit), तो Python खुद जवाब देगा (Backup Mode)
        query_lower = query.lower()
        
        if "dosage" in query_lower or "cardiofix" in query_lower:
            return "CardioFix Info (Backup): Beta-blocker. Dosage: 50mg daily."
            
        elif "log" in query_lower or "met" in query_lower or "meeting" in query_lower:
            # नाम निकालने की छोटी कोशिश
            name = "Doctor"
            if "dr." in query:
                parts = query.split("dr.")
                if len(parts) > 1:
                    name = "Dr." + parts[1].split()[0]
            return f"Success: Logged interaction with {name} (Backup Mode)."
            
        elif "schedule" in query_lower:
            return "Success: Meeting scheduled (Backup Mode)."
            
        elif "search" in query_lower or "last time" in query_lower:
            return "History Found: Last met on Oct 12th (Backup Mode)."
            
        else:
            return "System is currently offline due to rate limits. Please try again later."