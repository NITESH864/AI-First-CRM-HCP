# सही import यह है:
from langchain_core.tools import tool

# --- TOOL 1: LOGGING ---
@tool
def log_interaction(hcp_name: str, type: str, date: str, notes: str, sentiment: str):
    """
    Use this tool to LOG a new meeting.
    Required: hcp_name, type, date, notes, sentiment.
    """
    return f"Success: Logged interaction with {hcp_name} ({sentiment})."

# --- TOOL 2: EDITING ---
@tool
def edit_interaction(original_name: str, new_sentiment: str):
    """
    Use this tool to EDIT an existing interaction.
    """
    return f"Success: Updated record for {original_name}."

# --- TOOL 3: SEARCH ---
@tool
def search_hcp(query: str):
    """
    Use this tool to SEARCH past history.
    """
    return f"History Found: Last met {query} on Oct 12th."

# --- TOOL 4: INFO ---
@tool
def get_product_info(product_name: str):
    """
    Use this tool to get DOSAGE or MEDICAL INFO.
    """
    return "CardioFix Info: Beta-blocker. Dosage: 50mg daily."

# --- TOOL 5: SCHEDULE ---
@tool
def schedule_followup(date: str):
    """
    Use this tool to SCHEDULE a meeting.
    """
    return f"Success: Meeting scheduled for {date}."