extends KinematicBody2D

const GRID_SIZE: int = 16

const BASE_TEXTURE_PATH: String = "res://assets/sprites/"

enum Direction { DOWN, UP, LEFT }

export var speed: float = 2.3

var direction: int = Direction.DOWN
var axis: Vector2 = Vector2.ZERO
var next_position: Vector2 = Vector2.ZERO

onready var anim: AnimationPlayer = $Sprite/AnimationPlayer
onready var sprite: Sprite = $Sprite
onready var tween: Tween = $Tween
onready var ray: RayCast2D = $RayCast2D

func _ready():
	# Define uma textura padrão
	set_sprite_texture("SkyHopper")
	play_anim("idle", Direction.DOWN)

func _process(delta):
	update_inputs()
	if axis.x != 0 or axis.y != 0:
		update_direction()
		play_anim("walk", direction)
		try_move()
	else:
		play_anim("idle", direction)

func try_move():
	ray.enabled = true
	ray.force_raycast_update()
	if not ray.is_colliding():
		ray.enabled = false
		set_process(false)
		# Modificando a interpolação para usar a velocidade
		tween.interpolate_property(self, "position", position, next_position,
			0.5 / speed, Tween.TRANS_LINEAR, Tween.EASE_IN_OUT)
		tween.start()
		yield(tween, "tween_completed")
		set_process(true)
	else:
		ray.enabled = false


func update_inputs():
	axis.x = (
		int(Input.is_action_pressed("ui_right"))
		- int(Input.is_action_pressed("ui_left"))
	)
	axis.y = (
		int(Input.is_action_pressed("ui_down"))
		- int(Input.is_action_pressed("ui_up"))
	)

func update_direction():
	if axis.x != 0:
		direction = Direction.LEFT
		sprite.flip_h = axis.x > 0
		ray.cast_to = Vector2(axis.x * GRID_SIZE, 0)
		next_position = Vector2(
			round(position.x + ray.cast_to.x),
			round(position.y)
		)
	elif axis.y != 0:
		direction = Direction.DOWN if axis.y > 0 else Direction.UP
		ray.cast_to = Vector2(0, axis.y * GRID_SIZE)
		next_position = Vector2(
			round(position.x),
			round(position.y + ray.cast_to.y)
		)

func play_anim(animation: String, dir: int):
	anim.play("%s-%s" % [animation, dir])

func set_sprite_texture(texture_name: String):
	var texture_path = "%s%s.png" % [BASE_TEXTURE_PATH, texture_name]
	
	if ResourceLoader.exists(texture_path):
		sprite.texture = load(texture_path)
		print("Textura do sprite atualizada para:", texture_path)
	else:
		var default_texture = "%sShadowBlade.png" % BASE_TEXTURE_PATH
		if ResourceLoader.exists(default_texture):
			sprite.texture = load(default_texture)
			print("Arquivo não encontrado: %s. Textura padrão aplicada: %s" % [texture_path, default_texture])
		else:
			print("Erro crítico: FrostBite.png não encontrado em", BASE_TEXTURE_PATH)
