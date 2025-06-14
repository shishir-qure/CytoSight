from portkey_ai import Portkey

class LLMService:
    def __init__(self):
        self.portkey = Portkey(
            api_key="D0UlvVDbqxz4Lh7tMbI4KjNeFNYS",
            virtual_key="openrouter-2cc325"
        )

    def get_response(self, model, messages):
        try:
            chat_complete = self.portkey.chat.completions.create(
                model=model,
                messages=messages
            )
            return chat_complete.choices[0].message.content
        except Exception as e:
            print(e)
            return None

    def get_tool_response(self, model, messages, tools):
        try:
            chat_complete = self.portkey.chat.completions.create(
                model=model,
                messages=messages,
                tools=tools,
                tool_choice="auto"
            )
            return chat_complete.choices[0].message.content
        except Exception as e:
            print(e)
            raise e

