
------------------------------- Create schedule with date ----------------------------------------------------------------------------------------------------------------------------


CREATE PROCEDURE create_schedule_withoutdate(_time varchar, _date varchar, _price int4, _theater int4, _movie int4, _location varchar)
LANGUAGE plpgsql
AS $$
BEGIN
	DECLARE dateid INT4;
	BEGIN
		COMMIT;
		
		SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
		INSERT INTO schedule_date("date", "location")
		VALUES (_date, _location)
		RETURNING id into dateid;

		INSERT INTO schedule_time("time", "price", "theaterId", "movieId", "location", "scheduleDateId")
		VALUES (_time, _price, _theater, _movie, _location, dateid);
		ROLLBACK;
	END;
END;
$$;

CALL create_schedule_withoutdate ('1604671200574', '11/22/2020', 50000, 1, 2, 'hochiminh' );

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


------------------------------------------------------ Create schedule ---------------------------------------------------------------------------------------------------------------------
CREATE PROCEDURE create_schedule(_time varchar, _date varchar, _price int4, _theater int4, _movie int4, _location varchar)
LANGUAGE plpgsql
AS $$
BEGIN
	DECLARE 
		dateid INT4;
		new_dateid INT4;
	BEGIN
		COMMIT;
		
		SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
		SELECT id into dateid from schedule_date where date = _date;
		
		IF (NOT FOUND) then
			INSERT INTO schedule_date("date", "location")
			VALUES (_date, _location)
			RETURNING id into new_dateid;

			INSERT INTO schedule_time("time", "price", "theaterId", "movieId", "location", "scheduleDateId")
			VALUES (_time, _price, _theater, _movie, _location, new_dateid);
		ELSE
			INSERT INTO schedule_time("time", "price", "theaterId", "movieId", "location", "scheduleDateId")
			VALUES (_time, _price, _theater, _movie, _location, dateid);
		END IF;
		COMMIT;
	END;
END;
$$;


CALL create_schedule ('1604671200574', '11/26/2020', 50000, 1, 2, 'hochiminh' );

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


------------------------------------------------------------ With Sql --------------------------------------------------------------------------------------------------------------

CREATE PROCEDURE create_schedule_withoutdate(_time varchar, _date varchar, _price int4, _theater int4, _movie int4, _location varchar)
LANGUAGE SQL
AS $$
	
		WITH new_date as  (
			INSERT INTO schedule_date("date", "location")
			VALUES (_date, _location)
			RETURNING id
		)

		INSERT INTO schedule_time("time", "price", "theaterId", "movieId", "location", "scheduleDateId")
		SELECT _time, _price, _theater, _movie, _location, id as dateid
		FROM new_date;
$$;

BEGIN TRANSACTION ISOLATION LEVEL REPEATABLE READ;
CALL create_schedule_withoutdate ('1604671200574', '11/20/2020', 50000, 1, 2, 'hochiminh' );
COMMIT;

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
