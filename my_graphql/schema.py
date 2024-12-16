
from datetime import datetime
import graphene
from domain.models import Card
from domain.repository import CardRepository

class CardType(graphene.ObjectType):
    id = graphene.String()
    title = graphene.String()
    description = graphene.String()
    status = graphene.String()
    created_at = graphene.String()
    updated_at = graphene.String()

class Query(graphene.ObjectType):
    card = graphene.Field(CardType, id=graphene.String(required=True))
    cards = graphene.List(CardType, status=graphene.String())
    
    def resolve_card(self, info, id):
        repository: CardRepository = info.context.get('repo')
        card = repository.get(id)
        return card

    def resolve_cards(self, info, status=None):
        repository: CardRepository = info.context.get('repo')
        if status:
            return repository.list_by_status(status)
        return repository.list_all()

class CreateCard(graphene.Mutation):
    class Arguments:
        title = graphene.String(required=True)
        description = graphene.String(required=True)
        status = graphene.String(required=True)

    card = graphene.Field(CardType)

    def mutate(self, info, title, description, status):
        repository: CardRepository = info.context.get('repo')
        card = Card(
            title=title,
            description=description,
            status=status,
        )
        repository.create(card)
        return CreateCard(card=card)

class UpdateCard(graphene.Mutation):
    class Arguments:
        id = graphene.String(required=True)
        title = graphene.String()
        description = graphene.String()
        status = graphene.String()

    card = graphene.Field(CardType)

    def mutate(self, info, id, title=None, description=None, status=None):
        repository: CardRepository = info.context.get('repo')
        card = repository.get(id)
        if not card:
            raise Exception("Card not found")
        
        if title:
            card.title = title
        if description:
            card.description = description
        if status:
            card.status = status

        card.updated_at = datetime.now().isoformat()
        
        repository.update(card)
        return UpdateCard(card=card)

class DeleteCard(graphene.Mutation):
    class Arguments:
        id = graphene.String(required=True)

    success = graphene.Boolean()

    def mutate(self, info, id):
        repository: CardRepository = info.context.get('repo')
        repository.delete(id)
        return DeleteCard(success=True)

class Mutation(graphene.ObjectType):
    create_card = CreateCard.Field()
    update_card = UpdateCard.Field()
    delete_card = DeleteCard.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
print(f"Schema type: {type(schema)}")  # Should output <class 'graphene.schema.Schema'>
