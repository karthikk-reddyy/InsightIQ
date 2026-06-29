import json
import re
from ai_engine import ask_ai


def clean_json(response):
    """
    Extract JSON from LLM response.
    """

    response = response.strip()

    # Remove markdown if present
    response = response.replace("```json", "")
    response = response.replace("```", "")
    response = response.strip()

    start = response.find("{")
    end = response.rfind("}")

    if start != -1 and end != -1:
        response = response[start:end + 1]

    return response


def extract_intent(question, columns):

    prompt = f"""
You are an expert Data Analyst.

Dataset Columns:

{columns}

Your job is ONLY to understand the user's question.

Return ONLY valid JSON.

Never explain anything.

---------------------------------

Return this format exactly

{{
    "operation":"",
    "metric":"",
    "groupby":"",
    "aggregation":"",
    "filter":{{}},
    "sort":"",
    "limit":0
}}

---------------------------------

Allowed operations

count
sum
average
highest
lowest
top
bottom
unique
missing
duplicate
filter
trend

---------------------------------

Allowed aggregations

sum
mean
count
max
min

---------------------------------

Rules

1. metric should always be a dataset column.

2. groupby should be a categorical column.

3. filter should be a dictionary.

Example

{{

"Gender":"Female"

}}

or

{{

"Region":"South"

}}

4. sort should be

asc

or

desc

5. limit should be integer

---------------------------------

Examples

Question

How many mobiles?

Output

{{
"operation":"count",
"metric":"",
"groupby":"Product",
"aggregation":"count",
"filter":{{"Product":"Mobile"}},
"sort":"",
"limit":0
}}

---------------------------------

Question

Average salary of females

Output

{{
"operation":"average",
"metric":"Salary",
"groupby":"",
"aggregation":"mean",
"filter":{{"Gender":"Female"}},
"sort":"",
"limit":0
}}

---------------------------------

Question

Which region has highest sales?

Output

{{
"operation":"highest",
"metric":"Sales",
"groupby":"Region",
"aggregation":"sum",
"filter":{{}},
"sort":"desc",
"limit":1
}}

---------------------------------

Question

Top 10 customers

Output

{{
"operation":"top",
"metric":"Sales",
"groupby":"",
"aggregation":"",
"filter":{{}},
"sort":"desc",
"limit":10
}}

---------------------------------

Question

Total profit in South region

Output

{{
"operation":"sum",
"metric":"Profit",
"groupby":"",
"aggregation":"sum",
"filter":{{"Region":"South"}},
"sort":"",
"limit":0
}}

---------------------------------

Question

Show unique cities

Output

{{
"operation":"unique",
"metric":"City",
"groupby":"",
"aggregation":"",
"filter":{{}},
"sort":"",
"limit":0
}}

---------------------------------

Question

How many duplicate rows?

Output

{{
"operation":"duplicate",
"metric":"",
"groupby":"",
"aggregation":"",
"filter":{{}},
"sort":"",
"limit":0
}}

---------------------------------

Question

How many missing values?

Output

{{
"operation":"missing",
"metric":"",
"groupby":"",
"aggregation":"",
"filter":{{}},
"sort":"",
"limit":0
}}

---------------------------------

User Question

{question}

Return ONLY JSON.
"""

    response = ask_ai(question, prompt)

    try:

        response = clean_json(response)

        intent = json.loads(response)

        # Ensure all keys exist
        default = {
            "operation": "",
            "metric": "",
            "groupby": "",
            "aggregation": "",
            "filter": {},
            "sort": "",
            "limit": 0
        }

        default.update(intent)

        return default

    except Exception:

        return {
            "operation": "",
            "metric": "",
            "groupby": "",
            "aggregation": "",
            "filter": {},
            "sort": "",
            "limit": 0
        }