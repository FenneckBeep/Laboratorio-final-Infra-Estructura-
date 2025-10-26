from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import User
import json
from .notifications import send_notification  # <-- usamos tu notify.py




@csrf_exempt
def create_user(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        try:
            user = User.objects.create(
                name=data['name'],
                email=data['email'],
                phone=data['phone']
            )
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)


        # 📨 Enviar notificación usando notification-service
        subject = "¡Bienvenido a la página!"
        message = f"Hola {user.name}, gracias por registrarte en nuestra página"
        recipient = user.email


        # Intentamos enviar la notificación vía Notification Service
        try:
            send_notification(subject, recipient, message)
        except Exception as e:
            print(f"⚠️ Excepción al enviar notificación: {e}")


        return JsonResponse({'message': 'Usuario creado y notificación enviada', 'id': user.id})
   
    return JsonResponse({'error': 'Método no permitido'}, status=405)




def list_users(request):
    if request.method == 'GET':
        users = list(User.objects.values())
        return JsonResponse(users, safe=False)
    return JsonResponse({'error': 'Método no permitido'}, status=405)




################(PUT)##################
@csrf_exempt
def update_user(request, user_id):
    if request.method == 'PUT':
        try:
            data = json.loads(request.body)
            user = User.objects.get(id=user_id)
            user.name = data.get('name', user.name)
            user.email = data.get('email', user.email)
            user.phone = data.get('phone', user.phone)
            user.save()
            return JsonResponse({"message": "Usuario actualizado correctamente"})
        except User.DoesNotExist:
            return JsonResponse({"error": "Usuario no encontrado"}, status=404)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    else:
        return JsonResponse({"error": "Método no permitido"}, status=405)
   
################(DEL)##################    
@csrf_exempt
def delete_user(request, user_id):
    if request.method == 'DELETE':
        try:
            user = User.objects.get(id=user_id)
            user.delete()
            return JsonResponse({"message": "Usuario eliminado correctamente"})
        except User.DoesNotExist:
            return JsonResponse({"error": "Usuario no encontrado"}, status=404)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    else:
        return JsonResponse({"error": "Método no permitido"}, status=405)