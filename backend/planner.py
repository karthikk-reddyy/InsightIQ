# planner.py

def create_execution_plan(intent):

    plan = []

    # -------------------------
    # Apply Filters First
    # -------------------------

    if intent.get("filter"):

        plan.append({

            "step": "filter",

            "value": intent["filter"]

        })

    # -------------------------
    # GroupBy
    # -------------------------

    if intent.get("groupby"):

        plan.append({

            "step": "groupby",

            "column": intent["groupby"]

        })

    # -------------------------
    # Aggregation
    # -------------------------

    if intent.get("aggregation"):

        plan.append({

            "step": "aggregate",

            "metric": intent["metric"],

            "operation": intent["aggregation"]

        })

    # -------------------------
    # Main Operation
    # -------------------------

    plan.append({

        "step": intent["operation"],

        "metric": intent["metric"]

    })

    # -------------------------
    # Sorting
    # -------------------------

    if intent.get("sort"):

        plan.append({

            "step": "sort",

            "order": intent["sort"]

        })

    # -------------------------
    # Limit
    # -------------------------

    if intent.get("limit", 0) > 0:

        plan.append({

            "step": "limit",

            "value": intent["limit"]

        })

    return plan